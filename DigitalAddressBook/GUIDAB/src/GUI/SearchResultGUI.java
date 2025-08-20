package GUI;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import javax.swing.table.DefaultTableModel;

public class SearchResultGUI extends JFrame 
{
    private JTextArea textArea;
    private JButton closeBT;

    public SearchResultGUI(ArrayList<Contact> contacts) 
    {
        setTitle("Search Results - CONTACT");
        setSize(600, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        textArea = new JTextArea();
        textArea.setEditable(false);
        textArea.setFont(new Font("Tahoma", Font.ROMAN_BASELINE, 18));
        textArea.setForeground(Color.BLACK);
        
        JScrollPane scrollPane = new JScrollPane(textArea);
        add(scrollPane, BorderLayout.CENTER);

        closeBT = new JButton("Close");
        closeBT.setFont(new Font("Tahoma", Font.PLAIN, 15));
        closeBT.setBackground(new Color(72, 137, 149));
        closeBT.setForeground(Color.WHITE);
        closeBT.setFocusPainted(false);
        
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(closeBT);
        add(buttonPanel, BorderLayout.SOUTH);

        closeBT.addActionListener(new ActionListener() 
        {
        	public void actionPerformed(ActionEvent e)
        	{
        		dispose();
        	}
        });

        displayContacts(contacts);

        setVisible(true);
    }

    private void displayContacts(ArrayList<Contact> contacts) 
    {
        StringBuilder result = new StringBuilder();
        
        if (contacts.isEmpty()) 
        {
            result.append("No contacts found.");
        } 
        
        else 
        {
            for (Contact contact : contacts) 
            {
                result.append("Name: ").append(contact.getName()).append("\n")
                      .append("Phone Number: ").append(contact.getPhone()).append("\n")
                      .append("Email Address: ").append(contact.getEmail()).append("\n")
                      .append("Home Address: ").append(contact.getHome()).append("\n")
                      .append("====================\n");
            }
        }
        
        textArea.setText(result.toString());
    }
}