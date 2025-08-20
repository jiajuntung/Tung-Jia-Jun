package GUI;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.io.*;

public class RemoveContactGUI extends JFrame
{
    private JButton homePageBT, removeBT;
    private JTextField removeName;
    private ArrayList<Contact> contactList;
    private ContactManager contactManager;
    private static final String fileName = "Contact.txt";
    
    public RemoveContactGUI(ContactManager contactManager)
    {
        this.contactManager = contactManager;
        this.contactList = contactManager.getContactList();
        
        setTitle("Remove Contact");
        setSize(600, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        
        JPanel inputPanel = new JPanel();
        inputPanel.setLayout(new BoxLayout(inputPanel, BoxLayout.Y_AXIS));
        inputPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        
        Dimension inputPanelSize = new Dimension(500, 100);
        inputPanel.setPreferredSize(inputPanelSize);
        
        JLabel removeLabel = new JLabel("Name to Remove:");
        removeLabel.setFont(new Font("Arial", Font.BOLD, 20));
        removeLabel.setAlignmentX(Component.LEFT_ALIGNMENT);
        
        removeName = new JTextField();
        removeName.setPreferredSize(new Dimension(500, 40));
        removeName.setMaximumSize(new Dimension(500, 40));
        removeName.setAlignmentX(Component.LEFT_ALIGNMENT);
        
        inputPanel.add(Box.createRigidArea(new Dimension(0, 20)));
        inputPanel.add(removeLabel);
        inputPanel.add(removeName);
        
        
        homePageBT = new JButton("Home Page");
        homePageBT.setFont(new Font("Tahoma", Font.PLAIN, 15));
   	 	homePageBT.setBackground(new Color(72, 137, 149));
   	 	homePageBT.setForeground(Color.WHITE);
   	 	homePageBT.setFocusPainted(false);
        
        removeBT = new JButton("Remove");
        removeBT.setFont(new Font("Tahoma", Font.PLAIN, 15));
        removeBT.setBackground(new Color(72, 137, 149));
        removeBT.setForeground(Color.WHITE);
        removeBT.setFocusPainted(false);
   	 	
        inputPanel.add(removeBT);
        inputPanel.add(homePageBT);
        
        Dimension buttonSize = new Dimension(280, 40);
        removeBT.setPreferredSize(buttonSize);
        homePageBT.setPreferredSize(buttonSize);
        
        JPanel buttonPanel = new JPanel(new BorderLayout());
   	 	JPanel leftButtonPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
   	 	JPanel rightButtonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
   	 	
   	 	leftButtonPanel.add(homePageBT);
   	 	rightButtonPanel.add(removeBT);
   	 
   	 	buttonPanel.add(leftButtonPanel, BorderLayout.WEST);
        buttonPanel.add(rightButtonPanel, BorderLayout.EAST);
        
        add(buttonPanel, BorderLayout.SOUTH);
        add(inputPanel, BorderLayout.CENTER);
        
        removeBT.addActionListener(new ActionListener() 
        {
            public void actionPerformed(ActionEvent e)
            {
                removeContact();
            }
        });
        
        homePageBT.addActionListener(new ActionListener() 
        {
            public void actionPerformed(ActionEvent e) 
            {
                new HomePageGUI(contactManager).setVisible(true);  // Pass ContactManager to HomePageGUI
                dispose();  
            }
        });
        
        setVisible(true);
    }
    
    private void removeContact()
    {
        String nameRemove = removeName.getText().trim();
        
        if(nameRemove.isEmpty())
        {
            JOptionPane.showMessageDialog(this, "Name field cannot be empty.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }
    
        boolean removed = removeContactFromList(nameRemove);
        
        if(removed)
        {
            saveContactListToFile();
            JOptionPane.showMessageDialog(this, "Contact removed successfully.");
        }
        else
        {
            JOptionPane.showMessageDialog(this, "Contact not found.", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
        
    private boolean removeContactFromList(String name) 
    {
        for (int i = 0; i < contactList.size(); i++) 
        {
            Contact contact = contactList.get(i);
            if (contact.getName().equalsIgnoreCase(name)) 
            {
                contactList.remove(i);
                return true;
            }
        }
        return false;
    }

    private void saveContactListToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName))) 
        {
            for (Contact contact : contactList) 
            {
                writer.write(contact.getName() + "," + contact.getPhone() + "," + contact.getEmail() + "," + contact.getHome());
                writer.newLine();
            }
        } 
        
        catch (IOException e) 
        {
            JOptionPane.showMessageDialog(this, "Error saving contacts to file.", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
  
    public static void main(String[] args) 
    {
        ContactManager contactManager = new ContactManager(fileName);
        SwingUtilities.invokeLater(() -> new RemoveContactGUI(contactManager).setVisible(true));
    }
}