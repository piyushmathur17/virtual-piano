from flask import Flask
from flask import request
import json
from flask_cors import CORS, cross_origin
import tensorflow as tf
import numpy
import sys
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import Dropout
from tensorflow.keras.layers import LSTM
from tensorflow.keras.callbacks import ModelCheckpoint
from keras.utils import np_utils


app = Flask(__name__) 
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def complete(inputnotes):   
    filename = "./sheet.txt"
    raw_text = open(filename, 'r', encoding='utf-8').read()

    # create mapping of unique chars to integers
    chars = sorted(list(set(raw_text)))
    char_to_int = dict((c, i) for i, c in enumerate(chars))
    
    # summarize the loaded data
    n_chars = len(raw_text)
    n_vocab = len(chars)
    print("Total Characters: ", n_chars)
    print ("Total Vocab: ", n_vocab)
    # prepare the dataset of input to output pairs encoded as integers
    seq_length = 100
    dataX = []
    dataY = []
    for i in range(0, n_chars - seq_length, 1):
        seq_in = raw_text[i:i + seq_length]
        seq_out = raw_text[i + seq_length]
        dataX.append([char_to_int[char] for char in seq_in])
        dataY.append(char_to_int[seq_out])
    n_patterns = len(dataX)
    print("Total Patterns: ", n_patterns)
    # reshape X to be [samples, time steps, features]
    X = numpy.reshape(dataX, (n_patterns, seq_length, 1))
    # normalize
    X = X / float(n_vocab)
    # one hot encode the output variable
    y = np_utils.to_categorical(dataY)
    # define the LSTM model
    def create_model():
        model = Sequential()
        model.add(LSTM(256, input_shape=(X.shape[1], X.shape[2]), return_sequences=True))
        model.add(Dropout(0.2))
        model.add(LSTM(256))
        model.add(Dropout(0.2))
        model.add(Dense(y.shape[1], activation='softmax'))
        model.compile(loss='categorical_crossentropy', optimizer='adam')
        return model
    #define the checkpoint
    filepath="weights-improvement-{epoch:02d}-{loss:.4f}-bigger.hdf5"
    checkpoint = ModelCheckpoint(filepath, monitor='loss', verbose=1, save_best_only=True, mode='min')
    callbacks_list = [checkpoint]
    # fit the model
    start= 0
    flag = 0
    best_so_far=[0,0]
    for i in range(0,len(dataX)):
        for j in range(0,len(inputnotes)):
            if(dataX[i][j]==char_to_int[inputnotes[j]]):
                if(j+1>=best_so_far[1]):
                    best_so_far[0]=i
                    best_so_far[1]=best_so_far[1]+1
                    if(best_so_far[1]==len(inputnotes)):
                        flag=1
        if(flag==1):break
    start = best_so_far[0]
    print("seed index: ",start)
    pattern=[]
    for i in dataX[start]:
        pattern.append(i)
    model= create_model()
    model.load_weights('notePrediction_weights.h5')
    model.fit(X, y, epochs=1, batch_size=64, callbacks=callbacks_list)

    int_to_char = dict((i, c) for i, c in enumerate(chars))
    start = numpy.random.randint(0, len(dataX)-1)
    
    print("Seed:")
    print ("\"", ''.join([int_to_char[value] for value in pattern]), "\"")
    #generate characters
    for i in range(100):
        x = numpy.reshape(pattern, (1, len(pattern), 1))
        x = x / float(n_vocab)
        prediction = model.predict(x, verbose=0)
        index = numpy.argmax(prediction)
        result = int_to_char[index]
        seq_in = [int_to_char[value] for value in pattern]
        sys.stdout.write(result)
        pattern.append(index)
        pattern = pattern[1:len(pattern)]
    print("\nDone.")
    notes= []
    for i in pattern:
        notes.append(int_to_char[i])
    return notes

def predict(inp):
    inputnotes= []
    for i in inp:
        if(i!=' '):inputnotes.append(i)
    print("inputnotes: ",inputnotes)
    newnotes= complete(inputnotes)
    notes = inputnotes
    str1=" ";
    str1.join(notes)
    str1=str1+" "
    str1=str1.join(newnotes)
    return (str1)
    


@app.route('/yoyo/', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def determine_escalation():
    jsondata = request.json
    inp =jsondata['d']
    #a= index(data[0],)
    result= predict(inp)
    ans = {'sequence': result}

    return json.dumps(ans)


if __name__ == '__main__':
    app.run(debug=True)