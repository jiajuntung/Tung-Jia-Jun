package GUI;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.io.*;


public class ViewContactGUI extends JFrame 
{
    private JTextField searchField;
    private JTextArea textArea;
    private JButton searchBT, homePageBT;
    private ContactManager contactManager;

    public ViewContactGUI(ContactManager contactManager) 
    {
        this.contactManager = contactManager;
        
        setTitle("View Contacts");
        setSize(600, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        
        searchField = new JTextField(20);
        searchBT = new JButton("Search");
        searchBT.setFont(new Font("Tahoma", Font.PLAIN, 15));
        searchBT.setBackground(new Color(72, 137, 149));
        searchBT.setForeground(Color.WHITE);
        searchBT.setFocusPainted(false);
        
        JPanel searchPanel = new JPanel(new BorderLayout(5, 5));
        searchPanel.add(new JLabel("Search: "), BorderLayout.WEST);
        searchPanel.add(searchField, BorderLayout.CENTER);
        searchPanel.add(searchBT, BorderLayout.EAST);
        add(searchPanel, BorderLayout.NORTH);
        
        textArea = new JTextArea();
        textArea.setEditable(false);
        textArea.setFont(new Font("Tahoma", Font.ROMAN_BASELINE, 15));
        textArea.setForeground(Color.BLACK);
        
        JScrollPane scrollPanel = new JScrollPane(textArea);
        add(scrollPanel, BorderLayout.CENTER);
        
        homePageBT = new JButton("Home Page");
        homePageBT.setFont(new Font("Tahoma", Font.PLAIN, 15));
        homePageBT.setBackground(new Color(72, 137, 149));
        homePageBT.setForeground(Color.WHITE);
        homePageBT.setFocusPainted(false);
        
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(homePageBT);
        add(buttonPanel, BorderLayout.SOUTH);
        
        homePageBT.addActionListener(new ActionListener() 
        {
            public void actionPerformed(ActionEvent e) 
            {
                dispose();
            }
        });
        
        searchBT.addActionListener(new ActionListener() 
        {
            public void actionPerformed(ActionEvent e) 
            {
                String searchTerm = searchField.getText().trim();
                if (searchTerm.isEmpty()) 
                {
                    JOptionPane.showMessageDialog(ViewContactGUI.this, "Enter a search term", "Error", JOptionPane.ERROR_MESSAGE);
                } 
                
                else 
                {
                    ArrayList<Contact> results = contactManager.searchContacts(searchTerm);
                    displayContacts(results); // Display filtered results
                }
            }
        });
        
        displayContacts(contactManager.getContactList());
        setVisible(true);
    }
    
    private void displayContacts(ArrayList<Contact> contacts) 
    {
        StringBuilder displayContact = new StringBuilder();
        if (contacts.isEmpty()) 
        {
            displayContact.append("No contact found.");
        } 
        
        else
        {
            for (Contact contact : contacts) 
            {
                displayContact.append("Name: ").append(contact.getName()).append("\n")
                    .append("Phone Number: ").append(contact.getPhone()).append("\n")
                    .append("Email: ").append(contact.getEmail()).append("\n")
                    .append("Home Address: ").append(contact.getHome()).append("\n")
                    .append("====================\n");
            }
        }
        
        textArea.setText(displayContact.toString());
    }
	
	 public static void main(String[] args) 
	 {
		 SwingUtilities.invokeLater(() -> new ViewContactGUI(new ContactManager("contacts.txt")));
	 }
}
