package DigitalAddressBook;

import java.util.*;
import java.io.*;

public class HomePage 
{
	public static void main(String [] args)
	{
		Scanner input = new Scanner(System.in);
		boolean running = true;
		int choice = 0;
		
		// Load all group name from file when program starting
		try 
		{
            ContactGroupFile.loadGroupNamesFromFile();
        } 
		catch (IOException e) 
		{
            System.out.println("Error: " + e.getMessage());
        }
		
		// Display menu
		while(running == true)
		{
			System.out.println("======================================================================");
			System.out.println("\n\t\tWelcome to the Digital Address Book!\n");
			System.out.println("======================================================================");
			System.out.println("1. Add contact\t\t\t10. Remove contact from group");
			System.out.println("2. View contact\t\t\t11. Remove contact group");
			System.out.println("3. Modify contact\t\t12. Save contact");
			System.out.println("4. Remove contact\t\t13. View saved contact");
			System.out.println("5. Search contact\t\t14. Remove saved contact");
			System.out.println("6. Create contact group\t\t15. Pin contact");
			System.out.println("7. View contact group\t\t16. Remove pinned contact");
			System.out.println("8. Add contact to group\t\t17. Exit program");
			System.out.println("9. View contact by group\n");
			System.out.println("Please enter your choice: ");
			
			while(true)
			{
				// Check the validation of user input
				try
				{
					choice = Integer.parseInt(input.nextLine());
					
					if(choice < 1 || choice > 17)
					{
						System.out.println("Invalid choice. Please enter a valid choice (1 - 17).");
						System.out.println();
						System.out.println("Please enter your choice: ");
					}
					else
					{
						break;
					}
				}
				catch(NumberFormatException e)
				{
					System.out.println("Invalid choice. Please enter a valid choice (1 - 17).");
					System.out.println();
					System.out.println("Please enter your choice: ");
				}
			}
			
			switch(choice)
			{
				case 1:
					
					try
					{
						AddressBook.addContact();
					}
					catch(IOException e)
					{
						System.out.println("Error: " + e.getMessage());
					}
					
					System.out.println();
					
					break;
					
				case 2:
					
					System.out.println("Contact List: ");
					System.out.println();
					
					try
					{
						AddressBook.viewContact();
					}
					catch(FileNotFoundException e)
					{
						System.out.println("The contact list is empty. Please add your first contact.");
						System.out.println();
					}
					catch(IOException e)
					{
						System.out.println("Error: " + e.getMessage());
					}
					
					break;
					
				case 3:
					
					try
					{
						AddressBook.modifyContact();
					}
					catch(IOException e)
					{
						System.out.println("Error: " + e.getMessage());
					}
					
					break;
					
				case 4:
					
					try
					{
						AddressBook.removeContact();
					}
					catch(IOException e)
					{
						System.out.println("Error: " + e.getMessage());
					}
					
					break;
					
				case 5:
					
					try
					{
						AddressBook.searchContact();
					}
					catch(IOException e)
					{
						System.out.println("Error: " + e.getMessage());
					}
					
					break;
					
				case 6:
					
					try
					{
						ContactGroupFile.addContactGroup();
					}
					catch(IOException e)
					{
						System.out.println("Error: " + e.getMessage());
					}
					
					break;
					
				case 7:
					
					ContactGroupFile.viewGroupList();

					break;
					
				case 8:
					
					try
					{
						AddressBook.addContactToGroup();
					}
					catch(IOException e)
					{
						System.out.println("Error: " + e.getMessage());
					}
					
					break;
					
				case 9:
					
					try
					{
						AddressBook.viewContactFromGroup();
					}
					catch(IOException e)
					{
						System.out.println("Error: " + e.getMessage());
					}

					break;
					
				case 10:
					
					try
					{
						AddressBook.removeContactFromGroup();
					}
					catch(IOException e)
					{
						System.out.println("Error: " + e.getMessage());
					}
					
					break;
					
				case 11:
					 
					 try
					 {
						 ContactGroupFile.removeContactGroup();
					 }
					 catch(IOException e)
					 {
						 System.out.println("Error: " + e.getMessage());
					 }
					    
					 break;
					 
				case 12:
					
			        try 
			        {
			            SavedContactFile.saveContact();
			        } 
			        catch (IOException e) 
			        {
			            System.out.println("Error: " + e.getMessage());
			        }
			        
			        break;
			        
				case 13: 
					
			        try 
			        {
			            SavedContactFile.viewSavedContacts();
			        } 
			        catch (IOException e) 
			        {
			            System.out.println("Error: " + e.getMessage());
			        }
			        
			        break;
			        
				case 14: 
			        
			        try 
			        {
			            SavedContactFile.unsaveContact();
			        } 
			        catch (IOException e) 
			        {
			            System.out.println("Error: " + e.getMessage());
			        }
			        
			        break;
			        
				case 15: 
			        
			        try 
			        {
			           AddressBook.pinContact();
			        } 
			        catch (IOException e) 
			        {
			            System.out.println("Error: " + e.getMessage());
			        }
			        
			        break;
			        
				case 16: 
			        
			        try 
			        {
			           AddressBook.unpinContact();
			        } 
			        catch (IOException e) 
			        {
			            System.out.println("Error: " + e.getMessage());
			        }
			        
			        break;
					 
				case 17:
					
					System.out.println("Exiting......");
					running = false;
					
					break;
			}
		}
		
		input.close();
	}
}
