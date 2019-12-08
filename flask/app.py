
from flask import Flask, request,jsonify,render_template
import json
from selenium import webdriver
from bs4 import BeautifulSoup
import time
from selenium.common.exceptions import NoSuchElementException
import pickle
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS 
import pandas as pd
import numpy as np
import pickle
le = LabelEncoder()
import requests
import numpy as np
app = Flask(__name__)
CORS(app)
model = pickle.load(open('model.pkl','rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods = ['GET','POST'])
def predict():
    import pandas as pd
    import numpy as np
    import pickle

    #import missingno as msno 
    #import matplotlib.pyplot as plt

    from sklearn.preprocessing import PolynomialFeatures


    df=pd.read_csv("food_wastage.csv")

    from sklearn.preprocessing import LabelEncoder
    le=LabelEncoder()
    df['FoodName_coded']=le.fit_transform(df['FoodName'])

    x=df.iloc[:,[1,3]].values
    poly=PolynomialFeatures(degree=3)
    poly_x=poly.fit_transform(x)

    y=df.iloc[:,[2]].values

    from sklearn.linear_model import LinearRegression
    regressor=LinearRegression()
    regressor.fit(poly_x,y)

    # pickle.dump(regressor,open('model.pkl','wb'))
    # model = pickle.load(open('model.pkl','rb'))
    
    #test=pd.read_csv("test.csv")
    content = request.get_json()
    print (content)
    data = [[content['name'],content['age']]]
    df2=pd.DataFrame(data , columns = ['FoodName','Age'])
   
    df2['Food_encoded'] =le.fit_transform(df2.FoodName)

    x=df2.iloc[:,[1,2]].values
    
    poly_x=poly.fit_transform(x)

    y_pred=model.predict(poly_x)
    #test['Quantity']=y_pred
    #test.to_csv("Model.csv",index=Falseredict)
    # int_features = [ ]
    # final_features = [np.array(int_features)]
    # pridiction = model.predict(final_features)

    #output = round(pridiction[0],2)
    a = int (y_pred)
    print(a)
    return jsonify(a)
#    return render_template('index.html', prediction_text="Quantity is  %s"%(a))

# @app.route('/predict_api',methods= ['POST'])
# def predict_api():
#     data = request.get_json(force = True)
#     prediction = model.predict([np.array(list(data.values()))])

#     output =prediction[0]
#     return jsonify(output)
@app.route('/dash', methods =['GET','POST'])
def school():
    a = requests.get('http://10.1.3.184:5000/web')
    li = json.loads(a.text)
    x=np.array(li)
    li = list(np.unique(x))
    print(li[0])
    para = { }
    #print(a.json)
    def scarp(item):
          
        path = './chromedriver'
        driver = webdriver.Chrome(executable_path=path)
        item = str(item)
        driver.get("https://www.google.com/search?q=how+to+preserve+fresh+"+item+"+without+freezing&oq=how+to+preserve+fresh+tomatoes+without+freezing&aqs=chrome..69i57.525j0j7&sourceid=chrome&ie=UTF-8")
        content = driver.page_source
        soup = BeautifulSoup(content, features="html.parser")
        try:
            div = driver.find_element_by_css_selector('#rso > div:nth-child(1) > div > div.kp-blk.c2xzTb.Wnoohf.OJXvsb > div > div.ifM9O ').text
            text = str(div)
            return text
        except NoSuchElementException as exception:
            print("No such element")
        
        driver.close()
        #para.update({item:scarp(item)})

    para.update({item: scarp(item) for item in li})
    
    
    return render_template('dash.html' ,  title='Dashboard' , para = para)

# @app.route('/survey')
# def survey():

if __name__=='__main__':
    app.debug = True
    app.run(host = '0.0.0.0',port="5555")        