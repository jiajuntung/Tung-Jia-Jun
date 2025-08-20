package GUI;

import java.io.*;
import java.util.ArrayList;

public class ContactManager 
{
    private ArrayList<Contact> contactList;
    private String fileName;

    public ContactManager(String fileName) 
    {
        this.fileName = fileName;
        contactList = loadContactsFromFile();
    }

    public ArrayList<Contact> getContactList() 
    {
        return contactList;
    }

    public void addContact(Contact contact) 
    {
        contactList.add(contact);
        appendContactToFile(contact);
    }

    public void removeContact(String name) 
    {
        contactList.removeIf(contact -> contact.getName().equalsIgnoreCase(name));
        saveContactListToFile();
    }

    public ArrayList<Contact> searchContacts(String searchTerm) 
    {
        ArrayList<Contact> results = new ArrayList<>();
        for (Contact contact : contactList) 
        {
            if (contact.getName().toLowerCase().contains(searchTerm.toLowerCase())) 
            {
                results.add(contact);
            }
        }
        return results;
    }

    private void appendContactToFile(Contact contact) 
    {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName, true))) 
        {
            writer.write(contact.getName() + "," + contact.getPhone() + "," + contact.getEmail() + "," + contact.getHome());
            writer.newLine();
        } 
        
        catch (IOException e) 
        {
            e.printStackTrace();
        }
    }

    private void saveContactListToFile() 
    {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName))) 
        {
            for (Contact contact : contactList) 
            {
                writer.write(contact.getName() + "," + contact.getPhone() + "," + contact.getEmail() + "," + contact.getHome());
                writer.newLine();
            }
        } 
        
        catch (IOException e) 
        {
            e.printStackTrace();
        }
    }

    private ArrayList<Contact> loadContactsFromFile() 
    {
        ArrayList<Contact> contacts = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) 
        {
            String line;
            while ((line = reader.readLine()) != null) 
            {
                String[] data = line.split(",");
                
                if (data.length == 4) 
                {
                    contacts.add(new Contact(data[0], data[1], data[2], data[3]));
                }
            }
        } 
        
        catch (IOException e) 
        {
            e.printStackTrace();
        }
        return contacts;
    }
}
