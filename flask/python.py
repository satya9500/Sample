def mod():
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

    y_pred = regressor.predict(poly_x)

    pickle.dump(regressor,open('model.pkl','wb'))
    model = pickle.load(open('model.pkl','rb'))
    # test=pd.read_csv("test.csv")
    # test['FoodName_coded']=le.fit_transform(test.FoodName)

    # x=test.iloc[:,[1,2]].values
    # poly_x=poly.fit_transform(x)

    # y_pred=model.predict(poly_x)
    # test['Quantity']=y_pred
    # test.to_csv("Model.csv",index=False)