package GUI;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class AddressBookGUI extends JFrame
{
 private JTextField nameField, phoneField, emailField, homeField;
 private JButton addContactBT, homePageBT;
 private SaveContactToFile saveContactToFile;
 private ContactManager contactManager;
 
 public AddressBookGUI(ContactManager contactManager)
 {
	 this.contactManager = contactManager;
	 
	 setTitle("Address Book");
	 setSize(600,600);
	 setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	 setLayout(new BorderLayout());
	 
	 nameField = new JTextField(20);
	 phoneField = new JTextField(20);
	 emailField = new JTextField(20);
	 homeField = new JTextField(20);
	 
	 JPanel inputPanel = new JPanel(new GridLayout(6,2,10,10));
	 inputPanel.add(new JLabel("Name: "));
	 inputPanel.add(nameField);
	 inputPanel.add(new JLabel("Phone Number: "));
	 inputPanel.add(phoneField);
	 inputPanel.add(new JLabel("Email Address: "));
	 inputPanel.add(emailField);
	 inputPanel.add(new JLabel("Home Address: "));
	 inputPanel.add(homeField);
	
	 
	 homePageBT = new JButton("Home Page");
	 homePageBT.setFont(new Font("Tahoma", Font.PLAIN, 15 ));
	 homePageBT.setBackground(new Color(72, 137, 149));
	 homePageBT.setForeground(Color.WHITE);
	 homePageBT.setFocusPainted(false);
	 
	 addContactBT = new JButton("Add Contact");
	 addContactBT.setFont(new Font("Tahoma", Font.PLAIN, 15 ));
	 addContactBT.setBackground(new Color(72, 137, 149));
	 addContactBT.setForeground(Color.WHITE);
	 addContactBT.setFocusPainted(false);
	 
	 Dimension buttonSize = new Dimension(280, 40);
     addContactBT.setPreferredSize(buttonSize);
     homePageBT.setPreferredSize(buttonSize);
	 
	 JPanel buttonPanel = new JPanel(new BorderLayout());
	 JPanel leftButtonPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
	 JPanel rightButtonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
	 
	 leftButtonPanel.add(homePageBT);
	 rightButtonPanel.add(addContactBT);
	 
	 buttonPanel.add(leftButtonPanel, BorderLayout.WEST);
     buttonPanel.add(rightButtonPanel, BorderLayout.EAST);
     
     add(inputPanel, BorderLayout.CENTER);
     add(buttonPanel, BorderLayout.SOUTH);
	 
	 saveContactToFile = new SaveContactToFile ("Contact.txt");

	 add(inputPanel, BorderLayout.CENTER);

     addContactBT.addActionListener(new ActionListener() 
     {
    	 public void actionPerformed(ActionEvent e)
    	 {
    		 addContact();
    	 }
     });

     homePageBT.addActionListener(new ActionListener() 
     {
    	 public void actionPerformed(ActionEvent e)
    	 {
    		 new HomePageGUI(contactManager).setVisible(true);
    		 dispose();
    	 }
     });
    
     setVisible(true);
}
	 
	 private void addContact() 
	 {
	        String name = nameField.getText().trim();
	        String phone = phoneField.getText().trim();
	        String email = emailField.getText().trim();
	        String home = homeField.getText().trim();
	        
	        if (name.isEmpty() || phone.isEmpty()) 
	        {
	            JOptionPane.showMessageDialog(this, "Name and Phone are required", "Error", JOptionPane.ERROR_MESSAGE);
	            return;
	        }
	        
	        else if (!phone.matches("\\d+")) 
	        {
	            JOptionPane.showMessageDialog(this, "Phone number must contain only digits", "Error", JOptionPane.ERROR_MESSAGE);
	            return;
	        }
	        
	        if (!email.contains("@")) 
	        {
	            JOptionPane.showMessageDialog(this, "Email must contain '@'", "Error", JOptionPane.ERROR_MESSAGE);
	            return;
	        }
	        
	        Contact newContact = new Contact(name, phone, email, home);
	        contactManager.addContact(newContact);

	        JOptionPane.showMessageDialog(this, "Contact added successfully!");
	    }
 
 
 public static void main(String[] args)
 {
	 SwingUtilities.invokeLater(() -> new AddressBookGUI(new ContactManager("contacts.txt")).setVisible(true));
 }

}

