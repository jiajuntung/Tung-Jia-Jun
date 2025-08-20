package GUI;

public class Contact 
{
	private String name;
	private String phone;
	private String email;
	private String home;
	
	public Contact(String name, String phone, String email, String home)
	{
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.home = home;
	}
	
	public String getName()
	{
		return name;
	}
	
	public String getPhone()
	{
		return phone;
	}
	
	public String getEmail()
	{
		return email;
	}
	
	public String getHome()
	{
		return home;
	}
	
	public String toString() 
	{
        return name + ", " + phone + ", " + email + ", " + home;
    }

}
