package DigitalAddressBook;

import java.util.*;
import java.io.*;

public class SavedContactFile 
{
	static Scanner input = new Scanner(System.in);
	
	// Loads saved contacts from the "SavedContact.txt" file
	public static ArrayList<Contact> loadSavedContactsFromFile() throws IOException
	{
		ArrayList<Contact> savedContacts = new ArrayList<Contact>();
		File savedContactsFile = new File("SavedContact.txt");
		
		if(!savedContactsFile.exists())
		{
			return savedContacts;
		}
		
		try(Scanner inputFile = new Scanner(savedContactsFile))
		{
			// Read saved contacts from the file
			while(inputFile.hasNextLine())
			{
				String name = inputFile.nextLine().replace("Name: ", "").trim();
                String phoneNum = inputFile.nextLine().replace("Phone Number: ", "").trim();
                String emailAdd = inputFile.nextLine().replace("Email Address: ", "").trim();
                String homeAdd = inputFile.nextLine().replace("Home Address: ", "").trim();
                
                if (inputFile.hasNextLine()) 
    			{
                    inputFile.nextLine();
                }
                
                String savedStored = inputFile.nextLine().replace("Pinned: ", "").trim();
				boolean saved = false;
				
				if(savedStored.equalsIgnoreCase("true"))
				{
					saved = true;
				}
				
				// Add the contact to the list of saved contacts
                savedContacts.add(new Contact(name, phoneNum, emailAdd, homeAdd, saved));
			}
        }
		
		return savedContacts;
	}
	
	// Writes the list of saved contacts to the "SavedContact.txt" file
	public static void addSavedContactsToFile(ArrayList<Contact> savedContacts) throws IOException 
	{
        try (PrintWriter pw = new PrintWriter(new FileWriter("SavedContact.txt", false))) 
        {
        	// Write each saved contact's details to the file
            for (Contact contact : savedContacts) {
                pw.println("Name: " + contact.getName());
                pw.println("Phone Number: " + contact.getPhoneNum());
                pw.println("Email Address: " + contact.getEmailAdd());
                pw.println("Home Address: " + contact.getHomeAdd());
                pw.println("Pinned: " + contact.getPinned());
                pw.println();
            }
        }
    }
	
	// Save important contact information
	public static void saveContact() throws IOException 
	{
        ArrayList<Contact> Contacts = ContactFile.loadContactsFromFile();
        ArrayList<Contact> savedContacts = loadSavedContactsFromFile();
        String repeat;
        
        do
        {
        	String savedName;
        	 boolean found = false;
    		
        	 // Check validation of user input (Contact name)
    		do
    		{
    			System.out.println("Enter the contact name to save: ");
    			savedName = input.nextLine();
    			
    			if(savedName.isEmpty())
    			{
    				System.out.println("Invalid input. Please enter the contact name to save.");
    				System.out.println();
    			}
    			
    		}while(savedName.isEmpty());

            for (Contact contact : Contacts) 
            {
                if (contact.getName().equals(savedName)) 
                {
                	found = true;
                	
                    if (savedContacts.contains(contact)) 
                    {
                        System.out.println("Contact '" + savedName + "' is already saved.");
                        System.out.println();
                    }
                    else
                    {
                    	savedContacts.add(contact);
                        addSavedContactsToFile(savedContacts);
                        System.out.println("Contact '" + savedName + "' has been saved successfully.");
                        System.out.println();
                    }
                    break;
                }
            }
            
            if (!found) 
            {
                System.out.println("Contact '" + savedName + "' does not exist.");
                System.out.println();
            }
            
            // Let user to choose to continue to perform this function or return to home page
            do
			{
				System.out.println("Do you want to continue to save contact (Y / N)?");
				repeat = input.nextLine().trim();
				
				if(!repeat.equalsIgnoreCase("Y") && !repeat.equalsIgnoreCase("N"))
				{
					System.out.println("Invalid input. Enter 'Y' or 'y' to continue to save contact and 'N' or 'n' to return to home page.");	
					System.out.println();
				}
				
			}while (!repeat.equalsIgnoreCase("Y") && !repeat.equalsIgnoreCase("N"));
        }while (repeat.equalsIgnoreCase("Y"));
	}
	
	// Displays all saved contacts
	public static void viewSavedContacts() throws IOException 
	{
        ArrayList<Contact> savedContacts = loadSavedContactsFromFile();
        
        System.out.println("Saved Contacts: ");
        System.out.println();
        
        
        if (savedContacts.isEmpty()) 
        {
            System.out.println("No saved contacts yet. Please save your first contact.");
            System.out.println();
            
            return;
        }
        else
        {
            System.out.printf("%-25s %-25s %-30s %-30s%n", "Name", "Phone Number", "Email Address", "Home Address");
            System.out.println("=====================================================================================================");
            
            for (Contact contact : savedContacts) 
            {
            	System.out.printf("%-25s %-25s %-30s %-30s%n", contact.getName(), contact.getPhoneNum(), contact.getEmailAdd(), contact.getHomeAdd());
            }
            
            System.out.println();
        }
    }
	
	//  unsave contact information from the "SavedContact.txt" file
	 public static void unsaveContact() throws IOException
	 {
	        ArrayList<Contact> savedContacts = loadSavedContactsFromFile();
	        String repeat;
	        
	        do
	        {
	        	String unsaveName;
	        	boolean found = false;
				
				do
				{
					System.out.println("Enter the contact name to unsave: ");
					unsaveName = input.nextLine();
					
					if(unsaveName.isEmpty())
					{
						System.out.println("Invalid input. Please enter the contact name to unsave.");
						System.out.println();
					}
					
				}while(unsaveName.isEmpty());

		        Iterator<Contact> iterator = savedContacts.iterator();
		        
		        while (iterator.hasNext()) 
		        {
		            Contact contact = iterator.next();
		            
		            if (contact.getName().equalsIgnoreCase(unsaveName)) 
		            {
		                iterator.remove();
		                found = true;
		                break;
		            }
		        }

		        if (found) 
		        {
		            addSavedContactsToFile(savedContacts);
		            System.out.println("Contact '" + unsaveName + "' has been unsaved successfully.");
		            System.out.println(); 
		        } 
		        else 
		        {
		            System.out.println("Contact '" + unsaveName + "' is not saved.");
		            System.out.println();
		        }
		        
		        // Let user to choose to continue to perform this function or return to home page
		        do
				{
					System.out.println("Do you want to continue to unsave contact (Y / N)?");
					repeat = input.nextLine().trim();
					
					if(!repeat.equalsIgnoreCase("Y") && !repeat.equalsIgnoreCase("N"))
					{
						System.out.println("Invalid input. Enter 'Y' or 'y' to continue to save contact and 'N' or 'n' to return to home page.");	
						System.out.println();
					}
					
				}while (!repeat.equalsIgnoreCase("Y") && !repeat.equalsIgnoreCase("N"));
	        }while (repeat.equalsIgnoreCase("Y"));
	 }
}
