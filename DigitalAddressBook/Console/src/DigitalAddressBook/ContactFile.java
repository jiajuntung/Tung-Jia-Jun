package DigitalAddressBook;

import java.io.*;
import java.util.*;

public class ContactFile 
{
	// Save contact information to the contact file (Contacts.txt)
	public static void saveContactToFile(ArrayList<Contact> contactList)
	{
		try(PrintWriter pw = new PrintWriter(new FileWriter("Contacts.txt", false)))
		{	
			// Write each contact information to the file
			for(Contact contact : contactList)
			{
				pw.println("Name: " + contact.getName());
				pw.println("Phone Number: " + contact.getPhoneNum());
				pw.println("Email Address: " + contact.getEmailAdd());
				pw.println("Home Address: " + contact.getHomeAdd());
				pw.println("Pinned: " + contact.getPinned());
				pw.println();
			}
		}
		catch(IOException e)
		{
			System.out.println("Error: " + e.getMessage());
		}
	}
	
	// Load contact information from the contact file (Contacts.txt)
	public static ArrayList<Contact> loadContactsFromFile() throws IOException
	{
		ArrayList<Contact> contacts = new ArrayList<Contact>();
		File contactFile = new File("Contacts.txt");
		
		try(Scanner inputFile = new Scanner(contactFile))
		{	
			// Read contacts from the file line by line
			while(inputFile.hasNextLine())
			{
				String name = inputFile.nextLine().replace("Name: ", "").trim();
				String phoneNum = inputFile.nextLine().replace("Phone Number: ", "").trim();
				String emailAdd = inputFile.nextLine().replace("Email Address: ", "").trim();
				String homeAdd = inputFile.nextLine().replace("Home Address: ", "").trim();
				String pinnedStored = inputFile.nextLine().replace("Pinned: ", "").trim();
				boolean pinned = false;
				if(pinnedStored.equalsIgnoreCase("true")) pinned = true;
				if(inputFile.hasNextLine())
				{
					inputFile.nextLine();
				}
				contacts.add(new Contact(name, phoneNum, emailAdd, homeAdd, pinned));
			}
		}
		catch(IOException e)
		{
			System.out.println("Error: " + e.getMessage());
		}
		
		return contacts;
	}
}
