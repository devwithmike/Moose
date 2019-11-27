# **Moose**

A simple clone of mongoose, used for some WeThinkCode_ projects, made by [MikeFMeyer](https://github.com/mikefmeyer) & [FWMoor](https://github.com/FWMoor).

### **Description**

We can't use mongoose for some of our projects, so we decided to create our own. This is a much simpler version of mongoose, but it does what we need it to do.

## **Objective**

Recreating and adding some features and functions to use in our WeThinkCode_ projects.  

## **Contents**  
* [**Functions**](#functions)
  + [General Functions](#general-functions)
  + [Insert Functions](#insert-function)
  + [Find Function](#find-functions)
  + [Update Function](#update-functions)
  + [Delete Function](#delete-functions)
* [**Disclaimer**](#disclaimer)

## **Usage**

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

