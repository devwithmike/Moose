# **Moose**

A simple clone of mongoose, used for some WeThinkCode_ projects, made by [MikeFMeyer](https://github.com/mikefmeyer) & [FWMoor](https://github.com/FWMoor).

### **Description**

We can't use mongoose for some of our projects, so we decided to create our own. This is a much simpler version of mongoose, but it does what we need it to do.

## **Objective**

Recreating and adding some features and functions to use in our WeThinkCode_ projects.  

## **Contents**  
* [**Validation**](#validation)
* [**Functions**](#functions)
  + [General Functions](#general-functions)
  + [Insert Functions](#insert-function)
  + [Find Function](#find-functions)
  + [Update Function](#update-functions)
  + [Delete Function](#delete-functions)
* [**Disclaimer**](#disclaimer)

## **Usage**

## **Validation**  
Add the following to the schema to validate the input:  

- **required**  
  ```required: true```  
  If required is set to true, input is expected. If not input is received, an error will be added to the object. Expects a boolean value.  
  
- **min**  
  ```min: 6```  
  Min sets the minimum value of the input received. If the input is less, an error will be added to the object. Expects a numeric value.  
  
- **max**  
  ```max: 12```  
  Max sets the maximum value of the input received. If the input is more, an error will be added to the object. Expects a numeric value.  
  
- **length**  
  ```length: 6```
  Length sets the minimum length of the input. If the input's length is less, an error will be added to the object. Expects a numeric value.  
  
- **max-length**  
  ```max-length: 12```  
  Max-length sets the maximum length of the input. If the input's is more, an error will be added to the object. Expects a numeric value.  
  
- **strong**  
  ```string: true```  
  If strong is set to true, the input is checked to see if it contains at least 1 lowercase character, 1 uppercase character, 1 numeric value and 1 special character. If it doesn't, an error will be added to the object. Expects a boolean value.  
  
- **email**  
  ```email: true```  
  If email is set to true, the input is checked to see if it is a valid email address (only the formating of the address is checked). If not, and error is added to the object. Expects a boolean value.  
  
- **matches**  
  ```matches: 'password'```  
  Matches compares the input to the given key's input. If they're not the same or the given key doesn't exist, an error is added to the object. Expects a key name.  
  
- **hash**  
  ```hash: true```  
  If hash is set to true, the input is hashed using [bcrypt](https://www.npmjs.com/package/bcrypt). Expects a boolean value.  
  

## **Functions**  

### **General Functions**  

- **connect (database name, callback function):**  
  Used to makes a connection to the database.  
  
- **getPrimaryKey (id):**  

### **Insert Function**

- **insert (data, callback function):**  
  Used to insert document into a collection.

### **Find Functions**

- **findAll (callback function):**  
  Returns all the documents in a collection.  
  
- **findById (id, callback function):**  
  Returns the documents in a collection with the same id as the one provided.  
  
- **findOneById (id, callback function)**:  
  Returns one document in a collection with the same id as the one provided.  
  
- **findByAny (options, callback function):**  
  Returns the documents in a collection with the same value(s) as the value(s) provided.  
  
- **findOneByAny (options, callback function):**  
  Returns one document in a collection with the same value(s) as the value(s) provided.  

### **Update Functions**

- **updateById (id, data, callback function):**  
  Updates the value in the collection with the same id as the one provided.  
  
- **updateManyById (id, data, callback function):**  
  Updates the values in the collection with the same id as the one provided.  

### **Delete Functions**

- **deleteAll (options, callback function):**  
  Deletes all the values from a collection where the options are the same as the ones provided.  
  
- **deleteOne (id, callback function):**  
  Deletes one value from the collection where the id is the same as the one provided.  


## Disclaimer  

Moose does not contain all the features and functions mongoose has. Please read through the documentation for Moose before using it.

