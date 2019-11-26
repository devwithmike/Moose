# **Moose**

A simple clone of mongoose, used for some WeThinkCode_ projects, made by [MikeFMeyer](https://github.com/mikefmeyer) & [FWMoor](https://github.com/FWMoor).

### **Description**

We can't use mongoose for some of our projects, so we decided to create our own. This is a much simpler version of mongoose, but it does what we need it to do.

## **Objective**

Recreating and adding some features and functions to use in our WeThinkCode_ projects.

## **Functions**  

### **General Functions**  

- **connect (database name, callback function):**  
  Used to makes a connection to the database.  
  
- **getPrimaryKey (id):**  

### **Insert Function**

- **insert (collection, data, callback function):**  
  Used to insert document into a collection.

### **Find Functions**

- **findAll (collection, callback function):**  
  Returns all the documents in a collection.  
  
- **findById (collection, id, callback function):**  
  Returns the documents in a collection with the same id as the one provided.  
  
- **findOneById (collection, id, callback function)**:  
  Returns one document in a collection with the same id as the one provided.  
  
- **findByAny (collection, options, callback function):**  
  Returns the documents in a collection with the same value(s) as the value(s) provided.  
  
- **findOneByAny (collection, options, callback function):**  
  Returns one document in a collection with the same value(s) as the value(s) provided.  

### **Update Functions**

- **updateById (collection, id, data, callback function):**  
  Updates the value in the collection with the same id as the one provided.  
  
- **updateManyById (collection, id, data, callback function):**  
  Updates the values in the collection with the same id as the one provided.  

### **Delete Functions**

- **deleteAll (collection, options, callback function):**  
  Deletes all the values from a collection where the options are the same as the ones provided.  
  
- **deleteOne (collection, id, callback function):**  
  Deletes one value from the collection where the id is the same as the one provided.  

## Usage



## Disclaimer  

Moose does not contain all the features and functions mongoose has. Please read through the documentation for Moose before using it.

