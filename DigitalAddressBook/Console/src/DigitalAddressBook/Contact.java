package DigitalAddressBook;

public class Contact 
{
	private String name;
	private String phoneNum;
	private String emailAdd;
	private String homeAdd;
	private boolean pinned;
	
	public Contact(String name, String phoneNum, String emailAdd, String homeAdd, boolean pinned)
	{
		this.name = name;
		this.phoneNum = phoneNum;
		this.emailAdd = emailAdd;
		this.homeAdd = homeAdd;
		this.pinned = pinned;
	}
	
	public String getName()
	{
		return name;
	}
	
	public void setName(String name)
	{
		this.name = name;
	}
	
	public String getPhoneNum()
	{
		return phoneNum;
	}
	
	public void setPhoneNum(String phoneNum)
	{
		this.phoneNum = phoneNum;
	}
	
	public String getEmailAdd()
	{
		return emailAdd;
	}
	
	public void setEmailAdd(String emailAdd)
	{
		this.emailAdd = emailAdd;
	}
	
	public String getHomeAdd()
	{
		return homeAdd;
	}
	
	public void setHomeAdd(String homeAdd)
	{
		this.homeAdd = homeAdd;
	}
	
	public boolean getPinned()
	{
		return pinned;
	}
	
	public void setPinned(boolean pinned)
	{
		this.pinned = pinned;
	}
	
	// Compare contact information between 2 contacts
	public boolean equals(Object obj)
	{
		if(this == obj)
		{
			return true;
		}
		
		if(obj == null || getClass() != obj.getClass())
		{
			return false;
		}
		
		Contact contact = (Contact) obj; 

        if (!name.equalsIgnoreCase(contact.name)) 
        {
        	return false;
       	}
        
        if (!phoneNum.equals(contact.phoneNum)) 
        {
        	return false;
        }
        
        if (!emailAdd.equalsIgnoreCase(contact.emailAdd)) 
        {
        	return false;
       	}
        
        return homeAdd.equalsIgnoreCase(contact.homeAdd);
	}
	
	// Return true if 2 contact information are same
	public int hashCode() 
	{
        int result = name.toLowerCase().hashCode();
        
        result = 31 * result + phoneNum.hashCode();
        result = 31 * result + emailAdd.toLowerCase().hashCode();
        result = 31 * result + homeAdd.toLowerCase().hashCode();
        
        return result;
    }
}
