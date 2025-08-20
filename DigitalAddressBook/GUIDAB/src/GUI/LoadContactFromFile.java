package GUI;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class LoadContactFromFile 
{
	private String fileName;
	
	public LoadContactFromFile(String fileName)
	{
		this.fileName = fileName;
	}
	
	public ArrayList<Contact> loadContact()
	{
		ArrayList<Contact> contactList = new ArrayList<>();
		
		try(BufferedReader reader = new BufferedReader(new FileReader(fileName)))
		{
			String line;
			String name = null, phone = null, email = null, address = null;
			while((line = reader.readLine()) != null)
			{
				if (line.startsWith("Name: "))
				{
					name = line.substring("Name: ".length()).trim();
				}
				else if (line.startsWith("Phone Number: "))
                {
                    phone = line.substring("Phone Number: ".length()).trim();
                }
                else if (line.startsWith("Email: "))
                {
                    email = line.substring("Email: ".length()).trim();
                }
                else if (line.startsWith("Address: "))
                {
                    address = line.substring("Address: ".length()).trim();
                }
                else if (line.trim().equals("==================="))
                {
                	if (name != null)
                	{
                		contactList.add(new Contact(name, phone, email, address));
                		name = phone = email = address = null;
                	}
				}
			}
		}
			catch(IOException e)
			{
				throw new RuntimeException("Error loading contacts: " + e.getMessage());
			}
			
			return contactList;
		}
	}

