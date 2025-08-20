package GUI;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;

public class HomePageGUI extends JFrame
{
	private JButton addContactBT, viewContactBT, removeContactBT, searchContactBT, exitBT;
	private JTextField searchField;
	private ContactManager contactManager;
	
	public HomePageGUI(ContactManager contactManager)
	{
		this.contactManager = contactManager;
        
		setTitle("Digital Address Book - HOME PAGE");
		setSize(600,600);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setLayout(new BorderLayout(10, 10));
		
		JPanel topPanel = new JPanel();
        topPanel.setLayout(new BoxLayout(topPanel, BoxLayout.Y_AXIS));
		
		JLabel AddressBooktitle = new JLabel("Digital Address Book", SwingConstants.CENTER);
		AddressBooktitle.setFont(new Font("Comic Sans MS", Font.BOLD, 35 ));
		topPanel.add(AddressBooktitle);
		
		topPanel.add(Box.createRigidArea(new Dimension(0, 10)));
		
		searchContactBT = new JButton("Search");
		searchContactBT.setFont(new Font("Tahoma", Font.PLAIN, 15));
		searchContactBT.setBackground(new Color(72, 137, 149));
		searchContactBT.setForeground(Color.WHITE);
		searchContactBT.setFocusPainted(false);
		
		searchField = new JTextField(20);
		
		JPanel searchPanel = new JPanel();
		searchPanel.setLayout(new BorderLayout(5,5));
		searchPanel.add(new JLabel("Search Contact: "), BorderLayout.WEST);
		searchPanel.add(searchField, BorderLayout.CENTER);
		searchPanel.add(searchContactBT, BorderLayout.EAST);
		
		searchContactBT.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String searchTerm = searchField.getText().trim();
                if (searchTerm.isEmpty()) {
                    JOptionPane.showMessageDialog(HomePageGUI.this, "Search term cannot be empty", "Error", JOptionPane.ERROR_MESSAGE);
                } else {
                    ArrayList<Contact> results = contactManager.searchContacts(searchTerm);
                    if (results.isEmpty()) {
                        JOptionPane.showMessageDialog(HomePageGUI.this, "No contact found.", "Search Results", JOptionPane.INFORMATION_MESSAGE);
                    } else {
                        new SearchResultGUI(results).setVisible(true);
                    }
                }
            }
        });
		
		topPanel.add(searchPanel);
		add(topPanel, BorderLayout.NORTH);
		
		JPanel buttonPanel = new JPanel();
		JPanel bottomPanel = new JPanel();
		
		buttonPanel.setLayout(new FlowLayout(FlowLayout.CENTER, 90, 70));
		bottomPanel.setLayout(new FlowLayout(FlowLayout.CENTER, 10, 10));
		
		
		
		addContactBT = new JButton("Add contact");
		BTstyle(addContactBT);
		addContactBT.addActionListener(new ActionListener() 
		{
			public void actionPerformed(ActionEvent e)
			{
				new AddressBookGUI(contactManager).setVisible(true);
			}
		});
		
		viewContactBT = new JButton("View contact");
		BTstyle(viewContactBT);
		viewContactBT.addActionListener(new ActionListener() 
		{
			public void actionPerformed(ActionEvent e)
			{
				new ViewContactGUI(contactManager).setVisible(true);
			}
		});
		
		removeContactBT = new JButton("Remove contact");
		BTstyle(removeContactBT);
		removeContactBT.addActionListener(new ActionListener() 
		{
			public void actionPerformed(ActionEvent e)
			{
				new RemoveContactGUI(contactManager).setVisible(true);
			}
		});

		exitBT = new JButton("Exit program");
		BTstyle(exitBT);
		exitBT.addActionListener(new ActionListener() 
        {
        public void actionPerformed(ActionEvent e) 
        {
                System.exit(0);
        }
        });
		
		buttonPanel.add(addContactBT);
		buttonPanel.add(viewContactBT);
		buttonPanel.add(removeContactBT);
		bottomPanel.add(exitBT);
        
        add(buttonPanel, BorderLayout.CENTER);
        add(bottomPanel, BorderLayout.SOUTH);
        
        setVisible(true);
        
	}
	
	private void BTstyle(JButton button)
	{
		button.setFont(new Font("Tahoma", Font.PLAIN, 15));
		button.setBackground(new Color(72, 137, 149));
		button.setForeground(Color.WHITE);
		button.setFocusPainted(false);
		button.setBorder(BorderFactory.createEmptyBorder(30, 20, 30, 20));
	}
		
	public static void main(String[] args)
	{
		SwingUtilities.invokeLater(() -> 
		{
            ContactManager contactManager = new ContactManager("Contact.txt");
            new HomePageGUI(contactManager).setVisible(true);
		});
	}
}
	

