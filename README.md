# **Moose**

[![License](https://img.shields.io/github/license/MikeFMeyer/moose.svg?color=blue)]()
[![Stars](https://img.shields.io/github/stars/MikeFMeyer/moose.svg?color=blue)]()

### **Description**  

A lightweight ODM for MongoDB, made by [MikeFMeyer](https://github.com/mikefmeyer) & [FWMoor](https://github.com/FWMoor).  

## **Contents**  
* [**Validation**](#validation)
* [**Functions**](#functions)
  + [**General Functions**](#general-functions)
  + [**Insert Functions**](#insert-function)
  + [**Find Function**](#find-functions)
  + [**Update Function**](#update-functions)
  + [**Delete Function**](#delete-functions)
* [**Dependencies**](#dependencies)
* [**Team**](#team)
* [**License**](#license)
* [**Disclaimer**](#disclaimer)

## **Usage**

## **Validation**  
Add the following to the schema to validate the input:  

- **required**   
  If required is set to true, input is expected. If not input is received, an error will be added to the object. 
  > Expects a boolean value.  
  
- **min**  
  Min sets the minimum value of the input received. If the input is less, an error will be added to the object.  
  > Expects a numeric value.  
  
- **max**   
  Max sets the maximum value of the input received. If the input is more, an error will be added to the object.  
  > Expects a numeric value.  
  
- **length**  
  Length sets the minimum length of the input. If the input's length is less, an error will be added to the object.  
  > Expects a numeric value.  
  
- **max-length**    
  Max-length sets the maximum length of the input. If the input's is more, an error will be added to the object.  
  > Expects a numeric value.  
  
- **strong**    
  If strong is set to true, the input is checked to see if it contains at least 1 lowercase character, 1 uppercase character, 1 numeric value and 1 special character. If it doesn't, an error will be added to the object.  
  > Expects a boolean value.  
  
- **email**   
  If email is set to true, the input is checked to see if it is a valid email address (only the formating of the address is checked). If not, and error is added to the object.  
  > Expects a boolean value.  
  
- **matches**    
  Matches compares the input to the given key's input. If they're not the same or the given key doesn't exist, an error is added to the object.  
  > Expects a key name.  
  
- **hash**   
  If hash is set to true, the input is hashed using [bcrypt](https://www.npmjs.com/package/bcrypt).  
  > Expects a boolean value.  
  
- **default**  
  This allows you to set a default value for a field. If no input value is given the default value will be used.
  > Expects any value.
  
- **enum**  
  Checks if input fits into a given enum. If not, an error is added to the object.  
  > Expects any value.
  

## **Functions**  

### **General Functions**  

- **connect (database name, callback function):**  
  Used to makes a connection to the database.  
  
- **getPrimaryKey (id):**  

### **Insert Function**

- **insertOne (data, callback function):**  
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

## Dependencies  

[mongodb](https://www.npmjs.com/package/mongodb) - Database.  
[bcrypt](https://www.npmjs.com/package/bcrypt) - For hashing passwords and input.  

## Team  

[![Mike Meyer](https://avatars0.githubusercontent.com/u/32869361?v=4&s=144)](https://github.com/mikefmeyer)  | [![Frederick Moor](https://avatars2.githubusercontent.com/u/30631816?v=4&s=144)](https://github.com/fwmoor)
---|---
[Mike Meyer ](https://github.com/mikefmeyer) |[Frederick Moor](https://github.com/fwmoor)

## License  

See the [license](LICENSE) file for license rights and limitations (MIT).

## Disclaimer  

Moose is a very lightweight ODM for MongoDB, please read the documentation before using it.

