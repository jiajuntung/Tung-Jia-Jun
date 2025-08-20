package GUI;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class SaveContactToFile 
{
	private String fileName;
	
	public SaveContactToFile(String fileName)
	{
		this.fileName = fileName;
	}
	
	public void saveContact(String name, String phone, String email, String home) 
	{
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName, true))) 
        {
            writer.write("Name: " + name);
            writer.newLine();
            writer.write("Phone Number: " + phone);
            writer.newLine();
            writer.write("Email: " + email);
            writer.newLine();
            writer.write("Address: " + home);
            writer.newLine();
            writer.write("===================");
            writer.newLine();
        } 
        
        catch (IOException e) 
        {
            throw new RuntimeException("Error saving contact: " + e.getMessage());
        }
	}
	
        
	public void saveContact(ArrayList<Contact> contactList)
	{
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName,true)))
		{
			for (Contact contact : contactList)
			{
				writer.write("Name: " + contact.getName());
				writer.newLine();
				writer.write("Phone Number: " + contact.getPhone());
				writer.newLine();
				writer.write("Email: " + contact.getEmail());
				writer.newLine();	
				writer.write("Address: " + contact.getHome());
				writer.newLine();
				writer.write("===================");
				writer.newLine();
			}
			
		}
		catch (IOException e)
		{
			throw new RuntimeException("Error saving contact: " + e.getMessage());
		}
	}
}
