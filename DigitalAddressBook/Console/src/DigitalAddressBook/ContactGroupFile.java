package DigitalAddressBook;

import java.util.*;
import java.io.*;

public class ContactGroupFile 
{
	// ArrayList used to store contact group name
	public static ArrayList<String> GroupName = new ArrayList<String>();
	static Scanner input = new Scanner(System.in);
	
	// Create new contact group
	public static void addContactGroup() throws IOException
	{
		String groupName;
		String repeat;
		
		do
		{
			// Check validation of user input (Group name)
			do
			{
				System.out.println("Enter group name (mandatory): ");
				groupName = input.nextLine().trim();
				
				if(groupName.isEmpty())
				{
					System.out.println("Invalid input. Group name cannot be empty.");
		            System.out.println();
				}
			}while(groupName.isEmpty());
			
			// Create a file for the contact group with the specified name
			File contactGroup = new File(groupName + ".txt");
			
			if(contactGroup.exists())
			{
				// If the group already exists, notify the user
				System.out.println("Group '" + groupName + "' already exists.");
				System.out.println();
			}
			else
			{
				// Create the file and add the group name to the list
				if(contactGroup.createNewFile())
				{
					System.out.println("Group '" + groupName + "' created successfully.");
					System.out.println();
					
					GroupName.add(groupName);
			        saveGroupNamesToFile(); 
				}
			}
			
			// Let user to choose to continue to perform this function or return to home page
			do
			{
				System.out.println("Do you want to continue to create new contact group (Y / N)?");
				repeat = input.nextLine().trim();
				
				if(!repeat.equalsIgnoreCase("Y") && !repeat.equalsIgnoreCase("N"))
				{
					System.out.println("Invalid input. Enter 'Y' or 'y' to continue to create new contact group and 'N' or 'n' to return to home page.");	
					System.out.println();
				}
				
			}while (!repeat.equalsIgnoreCase("Y") && !repeat.equalsIgnoreCase("N"));
		}while(repeat.equalsIgnoreCase("Y"));	
	}
	
	// Remove existing contact group
	public static void removeContactGroup() throws IOException
	{
		String removeGroupName;
		String repeat;
		
		// Check validation of user input (Group name)
		do
		{
			do
			{
				System.out.println("Enter the group name to remove: ");
				removeGroupName = input.nextLine().trim();
				
				if(removeGroupName.isEmpty())
				{
					System.out.println("Invalid input. Please enter the group name to remove.");
					System.out.println();
				}
				
			}while(removeGroupName.isEmpty());
			
			boolean found = false;
			
			// Check if the contact group exists 
		    for (String groupName : GroupName) 
		    {
		        if (groupName.equals(removeGroupName)) 
		        {
		        	found = true;
	                break;
		        }
		    }
		    
		 // If the contact group is found, delete its file and remove it from the list
		    if (found) 
		    {   
		    	File contactGroup = new File(removeGroupName + ".txt");
		    	
		        if (contactGroup.exists() && contactGroup.delete()) 
		        {
		            GroupName.remove(removeGroupName);  
		            saveGroupNamesToFile(); 

		            System.out.println("Group '" + removeGroupName + "' has been removed successfully.");
		            System.out.println();
		        } 
		        else 
		        {
		            System.out.println("Group '" + removeGroupName + "' could not be removed.");
		            System.out.println();
		        }
		    } 
		    else 
		    {
		        System.out.println("Group '" + removeGroupName + "' does not exist.");
		        System.out.println();
		    }
		    
		    // Let user to choose to continue to perform this function or return to home page
		    do
			{
				System.out.println("Do you want to continue to remove contact  group (Y / N)?");
				repeat = input.nextLine().trim();
				
				if(!repeat.equalsIgnoreCase("Y") && !repeat.equalsIgnoreCase("N"))
				{
					System.out.println("Invalid input. Enter 'Y' or 'y' to continue to remove contact group and 'N' or 'n' to return to home page.");	
					System.out.println();
				}
				
			}while (!repeat.equalsIgnoreCase("Y") && !repeat.equalsIgnoreCase("N"));
		}while (repeat.equalsIgnoreCase("Y"));
	}
	
	//Saves all group names to the "GroupNames.txt" file
	public static void saveGroupNamesToFile() throws IOException 
	{
	    try (PrintWriter pw = new PrintWriter(new FileWriter("GroupNames.txt", false)))
	    {
	    	// Write each group name to the file
	        for (String groupName : GroupName) 
	        {
	            pw.println(groupName);
	        }
	    }
	}
	
	// Loads all group names from the "GroupNames.txt" file into memory
	public static void loadGroupNamesFromFile() throws IOException 
	{
		 File groupNameFile = new File("GroupNames.txt");

		 if(!groupNameFile.exists())
		 {
			 return;
		 }
		 
		 // Read the file and load each group name into the list
		 try (Scanner inputFile = new Scanner(groupNameFile)) 
		 {
			 GroupName.clear(); 
		        
			 while (inputFile.hasNextLine())
			 {
				 GroupName.add(inputFile.nextLine().trim());
			 }
		 }
	}
	
	// Displays the list of contact groups 
	public static void viewGroupList()
	{
		System.out.println("Group List: ");
		System.out.println();
		
		if(GroupName.isEmpty())
		{
			System.out.println("No group created yet. Please create your first group.");
			System.out.println();
		}
		else
		{
			for(String groupName : GroupName)
			{
				System.out.println(groupName);
			}
			
			System.out.println();
		}
	}
}
