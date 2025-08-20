package DigitalAddressBook;

import java.util.*;
import java.io.*;

public class AddressBook 
{
	static Scanner input = new Scanner(System.in);
	private static ArrayList<Contact> contactList = new ArrayList<Contact>();
	
	public static String performSameFuntion()
	{
		String repeat;
		
		do
		{
			System.out.println("Do you want to continue to perform this function (Y / N)?");
			repeat = input.nextLine().trim();
			
			if(!repeat.equalsIgnoreCase("Y") && !repeat.equalsIgnoreCase("N"))
			{
				System.out.println("Invalid input. Enter 'Y' or 'y' to continue to perform this function and 'N' or 'n' to return to home page.\n");	
			}
			
		}while (!repeat.equalsIgnoreCase("Y") && !repeat.equalsIgnoreCase("N"));
		
		return repeat;
	}
	
	// validate different attributes in one function name, phone number, email address, home address
	public static String validateUserInput(String attribute, String createOrModify) 
	{
		// share the same message for different attribute
		String msg = "Enter contact " + attribute;
		
		// mandatory fields
		String[] mandatory = {"name", "phone number"};
		
		// optional fields
		String[] optional = {"email address", "home address"};
		
		// if create, inform user which attributes are mandatory and optional
		if(createOrModify == "create") 
		{
			if(Arrays.asList(mandatory).contains(attribute)) 
			{
				msg += " (mandatory)";
			}
			else if(Arrays.asList(optional).contains(attribute)) 
			{
				msg += " (optional)";
			}
		}
		
		// if modify, all attributes no need mandatory
		// make new msg
		// clear mandatory array
		else if(createOrModify == "modify") 
		{
			msg = "Enter new " + attribute + " (click 'Enter' button to keep the current " + attribute + ")";
			Arrays.fill(mandatory, null);
		}
		
		String userInput;
		boolean formatWrong = false, userInputEmpty = false;
		
		do
		{
			System.out.println(msg + ": ");
			userInput = input.nextLine().trim();
			
			// if attribute is in mandatory array AND user give empty input
			if(Arrays.asList(mandatory).contains(attribute) && userInput.isEmpty()) 
			{
				// a condition used in do while, set to true to make the function rerun
				userInputEmpty = true;
			}
			else 
			{
				// reinitialize conditions to false
				formatWrong = false;
				userInputEmpty = false;
				
				// if validating phone number
				if(attribute.equalsIgnoreCase("phone number")) 
				{
					if (!userInput.isEmpty() && !userInput.matches("[0-9-]+"))
					{
						System.out.println("Invalid contact phone number. Contact phone number only can contain digit (0 - 9) and dash (-) only.\n");
						// a condition used in do while, set to true to make the function rerun
						formatWrong = true;
					}
				}
				
				// if validating email address
				if(attribute.equalsIgnoreCase("email address")) 
				{
					if(!userInput.isEmpty() && !userInput.contains("@"))
					{
						System.out.println("Invalid email address format. Email address must contains at sign symbol (@).\n");
						// a condition used in do while, set to true to make the function rerun
						formatWrong = true;
					}
				}
			}
			// if user give empty input and condition became true, show error message
			if(userInputEmpty) System.out.println("Invalid input. Contact "+attribute+" cannot be empty.\n");
		}while(userInputEmpty || formatWrong); // while any one of the conditions true, rerun the function
		
		return userInput;
	}
	
	// Add contact information into the file
	public static void addContact() throws IOException
	{
		// Save all contact information to an ArrayList
		contactList = ContactFile.loadContactsFromFile();
		String repeat;
		
		do
		{
			boolean found = false;
			
			// Check validation of user input name and ensure name has not been existing in the system
			String name = AddressBook.validateUserInput("name", "create");
			
			// Check whether the contact entered by user exist or not 
			for(Contact contactAlreadyExist : contactList)
			{
				if(contactAlreadyExist.getName().equals(name))
				{
					System.out.println("This contact already exist.\n");
					found = true;
					break;
				}
			}
			
			// if name is a new name not existing in the system
			if(!found)
			{
				// Check validation of the rest user input 
				String phoneNum = AddressBook.validateUserInput("phone number", "create");
				String emailAdd = AddressBook.validateUserInput("email address", "create");
				String homeAdd = AddressBook.validateUserInput("home address", "create");
				
				// Save new contact information to file
				Contact contact = new Contact(name, phoneNum, emailAdd, homeAdd, false);
				contactList.add(contact);
				ContactFile.saveContactToFile(contactList);
				System.out.println("Contact '" + name + "' added successfully.\n");
			}
			
			repeat = AddressBook.performSameFuntion();
		}while(repeat.equalsIgnoreCase("Y"));
	}
	
	// View contact information that saved in the file
	public static void viewContact() throws IOException, FileNotFoundException
	{
		Scanner inputFile = new Scanner(new File("Contacts.txt"));
		
		// Display all contact information that saved in the file
		if(!inputFile.hasNext())
		{
			System.out.println("The contact list is empty. Please add your first contact.\n");		
		}
		else
		{
			System.out.printf("%-25s %-25s %-30s %-30s%n", "Name", "Phone Number", "Email Address", "Home Address");
	        System.out.println("=====================================================================================================");
	        
	        List<String[]> pinnedContacts = new ArrayList<>();
	        List<String[]> notPinnedContacts = new ArrayList<>();
	        
			while(inputFile.hasNext())
			{
				String name = inputFile.nextLine().replace("Name: ", "").trim();
	            String phoneNum = inputFile.nextLine().replace("Phone Number: ", "").trim();
	            String emailAdd = inputFile.nextLine().replace("Email Address: ", "").trim();
	            String homeAdd = inputFile.nextLine().replace("Home Address: ", "").trim();
	            String pinnedStored = inputFile.nextLine().replace("Pinned: ", "").trim();
	            
	            boolean pinned = false;
	            if (pinnedStored.equalsIgnoreCase("true"))
	            {
	            	 pinned = true;
	            }
	            
				if(inputFile.hasNextLine())
				{
					inputFile.nextLine();
				}
				
				String[] contactDetails = {name, phoneNum, emailAdd, homeAdd};

	            if (pinned) 
	            {
	            	contactDetails[0] = contactDetails[0] + " (Pinned)";
	                pinnedContacts.add(contactDetails);
	            } 
	            else 
	            {
	            	notPinnedContacts.add(contactDetails);
	            }
			}
			for (String[] contact : pinnedContacts) 
			{
	            System.out.printf("%-25s %-25s %-30s %-30s%n", contact[0], contact[1], contact[2], contact[3]);
	        }
	        for (String[] contact : notPinnedContacts) 
	        {
	            System.out.printf("%-25s %-25s %-30s %-30s%n", contact[0], contact[1], contact[2], contact[3]);
	        }
			System.out.println();
		}
		
		inputFile.close();
	}
	
	// Remove contact information from the file
	public static void removeContact() throws IOException
	{
		String repeat;
	
		do
		{
			contactList = ContactFile.loadContactsFromFile();
			String removeName;
			
			// Check validation of user input (Contact name)
			do
			{
				 System.out.println("Enter the name of the contact to remove: ");
				 removeName = input.nextLine().trim();
				
				 if (removeName.isEmpty()) 
					{ 
				        System.out.println("Invalid input. Contact name cannot be empty. Please enter a contact name to remove.\n");
				    } 
			}while(removeName.isEmpty());
			
			 // Create a new ArrayList to store contact information that want to be removed
			 ArrayList<Contact> updatedContacts = new ArrayList<Contact>();
			 boolean found = false;
			
			for(Contact contact : contactList)
			{
				if(!contact.getName().equals(removeName))
				{
					updatedContacts.add(contact);
				}
				else
				{
					found = true;
				}
			}
			
			// Remove contact information from the file and update the file
			if(found)
			{
				ContactFile.saveContactToFile(updatedContacts);
				System.out.println("Contact removed successfully.\n");
			}
			else
			{
				System.out.println("Contact '" + removeName + "' does not exist.\n");
			}
			
			repeat = AddressBook.performSameFuntion();	
		}while(repeat.equalsIgnoreCase("Y"));
	}
	
	// Search contact information that saved in the file by using characters
	public static void searchContact() throws IOException
	{
		// Save contact information into an ArrayList
		contactList = ContactFile.loadContactsFromFile();
		String repeat, letter;
		
		do
		{
			boolean found = false;
			
			// Check validation of user input (characters)
			do
			{
				System.out.println("Enter a letter or some letters to search contacts: ");
				letter = input.nextLine().trim();
				
				if(letter.isEmpty())
				{
					System.out.println("Invalid input. Please enter at least one letter to search contacts.\n");
				}
			}while(letter.isEmpty());
			
			String Letter = letter.toLowerCase();
			
			// Display all contact information in which the contact name contains the characters that entered by user
	        for(Contact contact : contactList)
			{
	        	String contactName = contact.getName().toLowerCase();
	        	boolean foundLetter = false;
	        	
	        	if (contactName.indexOf(Letter) >= 0) 
                {
                    foundLetter = true;
                }
	        	
	        	if (foundLetter) 
	        	{
	                if (!found) 
	                {
	                    System.out.printf("%-25s %-25s %-30s %-30s%n", "Name", "Phone Number", "Email Address", "Home Address");
	                    System.out.println("=====================================================================================================");
	                    found = true; 
	                }

	                String name = contact.getName();
	                if(contact.getPinned()) {
	                	name = name + " (Pinned)";
	                }
	                System.out.printf("%-25s %-25s %-30s %-30s%n", name, contact.getPhoneNum(), contact.getEmailAdd(), contact.getHomeAdd());
	                System.out.println();				}
			}
	        
			if(!found)
			{
				System.out.println("No contacts found containing the letter: " + letter);
				System.out.println();
			}
			
			repeat = AddressBook.performSameFuntion();
		}while(repeat.equalsIgnoreCase("Y"));
	}
	
	// Add contact information into the group file
	public static void addContactToGroup() throws IOException
	{
		String groupName, contactName, repeat;
		contactList = ContactFile.loadContactsFromFile();
		
		// Check validation of user input (Group name)
		do
		{
			do
			{
				System.out.println("Enter the group name: ");
				groupName = input.nextLine();
				
				if(groupName.isEmpty())
				{
					System.out.println("Invalid input. Please enter the group name.");
					System.out.println();
				}
				
			}while(groupName.isEmpty());
			
			Contact contactToAdd = null;
			boolean found = ContactGroupFile.GroupName.contains(groupName);
			
			// Check validation of user input (Contact name)
			if(!found)
			{
				 System.out.println("Group '" + groupName + "' does not exist. Please create this group first.\n");
				 System.out.println();
			}
			else
			{
				do
				{
					System.out.println("Enter the contact name to add to '" + groupName + "' group: ");
					contactName = input.nextLine();
					
					if(contactName.isEmpty())
					{
						System.out.println("Invalid input. Please enter the contact name.\n");
					}
				}while(contactName.isEmpty());
				
				for(Contact contact : contactList)
				{
					if(contact.getName().equals(contactName))
					{
						contactToAdd = contact;
						break;
					}
				}
				
				// Save specified contact information into specified group
				if(contactToAdd == null)
				{
					System.out.println("Contact '" + contactName + "' does not exist. Please add this contact first.\n");
				}	
				else 
				{
	                File groupFile = new File(groupName + ".txt");
	                ArrayList<Contact> groupContacts = new ArrayList<>();

	                try (Scanner inputFile = new Scanner(groupFile)) 
	                {
	                    while (inputFile.hasNextLine()) 
	                    {
	                        String name = inputFile.nextLine().replace("Name: ", "").trim();
	                        String phoneNum = inputFile.nextLine().replace("Phone Number: ", "").trim();
	                        String emailAdd = inputFile.nextLine().replace("Email Address: ", "").trim();
	                        String homeAdd = inputFile.nextLine().replace("Home Address: ", "").trim();

	                        if (inputFile.hasNextLine()) 
	                        {
	                            inputFile.nextLine();
	                        }

	                        groupContacts.add(new Contact(name, phoneNum, emailAdd, homeAdd, false));
	                    }
	                } 
	                catch (IOException e) 
	                {
	                    System.out.println("Error: " + e.getMessage());
	                }

	                if (groupContacts.contains(contactToAdd)) 
	                {
	                    System.out.println("Contact '" + contactName + "' is already in group '" + groupName + "'.\n");
	                } 
	                else 
	                {
	                    try (PrintWriter pw = new PrintWriter(new BufferedWriter(new FileWriter(groupFile, true)))) 
	                    {
	                        pw.println("Name: " + contactToAdd.getName());
	                        pw.println("Phone Number: " + contactToAdd.getPhoneNum());
	                        pw.println("Email Address: " + contactToAdd.getEmailAdd());
	                        pw.println("Home Address: " + contactToAdd.getHomeAdd() + "\n");
	                    } 
	                    catch (IOException e) 
	                    {
	                        System.out.println("Error: " + e.getMessage());
	                    }

	                    System.out.println("Contact '" + contactName + "' has been successfully added to group '" + groupName + "'.\n");
	                }
	            }
	        }
			
			repeat = AddressBook.performSameFuntion();
		}while(repeat.equalsIgnoreCase("Y"));
	}
	
	// View contact information that saved in specified group
	public static void viewContactFromGroup() throws IOException
	{
		String repeat;
		
		// Display contact information that saved in specified group
		do
		{
			System.out.println("Enter the group name to view contacts: ");
			String groupName = input.nextLine();
			
			boolean groupExist = ContactGroupFile.GroupName.contains(groupName);
			
			File groupFile = new File(groupName + ".txt");
			
			if (!groupExist) 
			{
		        System.out.println("Group '" + groupName + "' does not exist. Please create this group first.\n");
		    }
			else
			{
				System.out.println(groupName + ":\n");
				
				boolean isEmpty = true;
				
				try(Scanner inputFile = new Scanner(groupFile))
				{   
					if(inputFile.hasNextLine())
					{
						System.out.printf("%-25s %-25s %-30s %-30s%n", "Name", "Phone Number", "Email Address", "Home Address");
					    System.out.println("=====================================================================================================");
					}
					
					while(inputFile.hasNextLine())
					{
						String name = inputFile.nextLine().replace("Name: ", "").trim();
						String phoneNum = inputFile.nextLine().replace("Phone Number: ", "").trim();
						String emailAdd = inputFile.nextLine().replace("Email Address: ", "").trim();
						String homeAdd = inputFile.nextLine().replace("Home Address: ", "").trim();
						
						if(inputFile.hasNextLine())
						{
							inputFile.nextLine();
						}
						
						System.out.printf("%-25s %-25s %-30s %-30s%n", name, phoneNum, emailAdd, homeAdd);
						System.out.println();
						
						isEmpty = false;
					}
					
					if (isEmpty) 
					{
				        System.out.println("This group is empty.");
				        System.out.println();
				    }
				}
			}
			
			repeat = AddressBook.performSameFuntion();
		}while(repeat.equalsIgnoreCase("Y"));
	}
	
	// Remove contact information that saved in specified group
	public static void removeContactFromGroup() throws IOException 
	{    
		String groupName, contactName, repeat;

		// Check validation of user input (Group name)
		do
		{
			do
			{
				System.out.println("Enter the group name: ");
				groupName = input.nextLine();
				
				if(groupName.isEmpty())
				{
					System.out.println("Invalid input. Please enter the group name.");
					System.out.println();
				}
				
			}while(groupName.isEmpty());
			
			File groupFile = new File(groupName + ".txt");
		    
		    if (!groupFile.exists()) 
		    {
		        System.out.println("Group '" + groupName + "' does not exist. Please create this group first.");
		        System.out.println();
		    }
		    else
		    {
		    	ArrayList<Contact> groupContacts = new ArrayList<Contact>();
			    boolean found = false;
			    
			    do
				{
					System.out.println("Enter the contact name to remove from '" + groupName + "' group: ");
					contactName = input.nextLine();
					
					if(contactName.isEmpty())
					{
						System.out.println("Invalid input. Please enter the contact name.\n");
					}
					else
					{	
						for(Contact contact : groupContacts)
						{
							if(contactName.equals(contact.getName()))
							{
								found = true;
							}
						}
					}	
				}while(contactName.isEmpty());
			    
			    try(Scanner inputFile = new Scanner(groupFile))
			    {
			    	while (inputFile.hasNextLine()) 
			    	{
			    		String name = inputFile.nextLine().replace("Name: ", "").trim();
			            String phoneNum = inputFile.nextLine().replace("Phone Number: ", "").trim();
			            String emailAdd = inputFile.nextLine().replace("Email Address: ", "").trim();
			            String homeAdd = inputFile.nextLine().replace("Home Address: ", "").trim();
			            
			            if (inputFile.hasNextLine()) 
			            {
			                inputFile.nextLine(); 
			            }

			            if (name.equalsIgnoreCase(contactName)) 
			            {
			            	found = true;
			            	continue;
			            } 
			            
			            Contact contact = new Contact(name, phoneNum, emailAdd, homeAdd, false);
			            groupContacts.add(contact);  
			    	}
			    }

			    // Remove contact information from specified group
			    if (!found) 
			    {
			        System.out.println("Contact '" + contactName + "' not found in group '" + groupName + "'.\n");
			    }
			    else
			    {
			    	try (PrintWriter outputFile = new PrintWriter(new FileWriter(groupFile, false))) 
				    {
				        for (Contact contact : groupContacts) 
				        {
				        	outputFile.println("Name: " + contact.getName());
				            outputFile.println("Phone Number: " + contact.getPhoneNum());
				            outputFile.println("Email Address: " + contact.getEmailAdd());
				            outputFile.println("Home Address: " + contact.getHomeAdd() + "\n");
				        }
				    }
				    
				    System.out.println("Contact '" + contactName + "' has been removed from group '" + groupName + "'.\n");
			    }
		    }
		    
		    repeat = AddressBook.performSameFuntion();
		}while(repeat.equalsIgnoreCase("Y"));
	}
	
	// Modify contact information that saved in the contact file
	public static void modifyContact() throws IOException
	{
		String repeat;
		
		do
		{
			contactList = ContactFile.loadContactsFromFile();
			String modifyName;
			
			// Check validation of user input (Contact name)
			do
			{
				System.out.println("Enter the name of the contact to modify: ");
				modifyName = input.nextLine().trim();
				
				if(modifyName.isEmpty())
				{
					System.out.println("Invalid input. Contact name cannot be empty. Please enter a contact name to modify.\n");
				}
			}while(modifyName.isEmpty());
			
			boolean found = false;
			
			for (Contact contact : contactList) 
			{
	            if (contact.getName().equals(modifyName)) 
	            {
	                found = true;
	                
	                String newName = AddressBook.validateUserInput("name", "modify");
	                if (!newName.isEmpty()) 
	                {
	                    contact.setName(newName);
	                    System.out.println("Contact name has been modified.\n");
	                }
	                
	    			String newPhoneNum = AddressBook.validateUserInput("phone number", "modify");
	    			if(!newPhoneNum.isEmpty()) 
	                {
	                	contact.setPhoneNum(newPhoneNum);
	                    System.out.println("Contact phone number has been modified.\n");
	                }
	    			
	    			String newEmailAdd = AddressBook.validateUserInput("email address", "modify");
	    			 if(!newEmailAdd.isEmpty()) 
		             {
		                contact.setEmailAdd(newEmailAdd);
		                System.out.println("Contact email address has been modified.\n");
		            }
	    			
	    			String newHomeAdd = AddressBook.validateUserInput("home address", "modify");
	                if (!newHomeAdd.isEmpty()) 
	                {
	                    contact.setHomeAdd(newHomeAdd);
	                    
	                    System.out.println("Contact home address has been modified.\n");
	                }
	                
	                break;
	            }
	        }
			
			// Prompt user that the contact does not exist
	        if (!found) 
	        {
	            System.out.println("Contact does not exist.\n");
	        } 
	        else 
	        {
	            
	            ContactFile.saveContactToFile(contactList);
	        }
			
	        repeat = AddressBook.performSameFuntion();
		}while(repeat.equalsIgnoreCase("Y"));
	}
	
	// Pin information contact information
	public static void pinContact() throws IOException
	{	
		String repeat;
		
		do
		{	
			contactList = ContactFile.loadContactsFromFile();
			String pinName;
			
			// Check validation of user input (Contact name)
			do
			{
				System.out.println("Enter the name of the contact to pin: ");
				pinName = input.nextLine().trim();
				
				if(pinName.isEmpty())
				{
					System.out.println("Invalid input. Contact name cannot be empty. Please enter a contact name to pin.\n");
				}
			}while(pinName.isEmpty());
			
			boolean found = false;
			
			// Pin important contact information
			for (Contact contact : contactList) 
			{
				if (contact.getName().equals(pinName)) 
	            {
	                found = true;
	                if(contact.getPinned() == false) 
	                {
		                contact.setPinned(true);
			            System.out.println("Contact pinned successfully.\n");
	                }
	                else 
	                {
	                	System.out.println("Contact '" + pinName + "' already be pinned.\n");
	                }
	                
	                break;
	            }
	        }
			
	        if (!found) 
	        {
	            System.out.println("Contact does not exist.\n");
	        } 
	        else 
	        {
	            
	            ContactFile.saveContactToFile(contactList);
	        }
			
	        repeat = AddressBook.performSameFuntion();
		}while(repeat.equalsIgnoreCase("Y"));
	}
	
	// Unpin contact information
	public static void unpinContact() throws IOException
	{	
		String repeat;
		
		do
		{	
			contactList = ContactFile.loadContactsFromFile();
			String pinName;
			
			// Check validation of user input (Contact name)
			do
			{
				System.out.println("Enter the name of the contact to unpin: ");
				pinName = input.nextLine().trim();
				
				if(pinName.isEmpty())
				{
					System.out.println("Invalid input. Contact name cannot be empty. Please enter a contact name to unpin.\n");
				}
			}while(pinName.isEmpty());
			
			boolean found = false;
			
			// Unpin contact information
			for (Contact contact : contactList) 
			{
				if (contact.getName().equals(pinName)) 
	            {
	                found = true;
	                if(contact.getPinned() == true) 
	                {
		                contact.setPinned(false);
			            System.out.println("Contact unpinned successfully.\n");
	                }
	                else 
	                {
	                	System.out.println("Contact '" + pinName + "' already be unpinned.\n");
	                }
	                
	                break;
	            }
	        }
			
	        if (!found) 
	        {
	            System.out.println("Contact does not exist.\n");
	        } 
	        else 
	        {
	            
	            ContactFile.saveContactToFile(contactList);
	        }
			
	        repeat = AddressBook.performSameFuntion();
		}while(repeat.equalsIgnoreCase("Y"));
	}
}
