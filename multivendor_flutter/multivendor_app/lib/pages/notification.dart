import 'package:flutter/material.dart';

class NotificationPage extends StatefulWidget {
  const NotificationPage({super.key});

  @override
  State<NotificationPage> createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
  final List<Map<String, String>> notifications = [
    {"title": "Order Shipped", "message": "Your order #12345 has been shipped!", "time": "2h ago"},
    {"title": "Discount Offer", "message": "Get 20% off on your next purchase!", "time": "1d ago"},
    {"title": "Payment Received", "message": "Your payment for order #98765 is successful.", "time": "3d ago"},
    {"title": "New Product Alert", "message": "Check out the latest arrivals in electronics!", "time": "5d ago"},
    {"title": "Order Delivered", "message": "Your order #67890 has been delivered successfully.", "time": "1w ago"},
  ];

  List<Map<String, String>> filteredNotifications = [];
  String searchQuery = "";

  @override
  void initState() {
    super.initState();
    filteredNotifications = List.from(notifications);
  }

  void filterNotifications(String query) {
    setState(() {
      searchQuery = query;
      filteredNotifications = notifications
          .where((notification) =>
      notification["title"]!.toLowerCase().contains(query.toLowerCase()) ||
          notification["message"]!.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  void showFilterOptions() {
    showModalBottomSheet(
      context: context,
      builder: (context) {
        return Container(
          padding: const EdgeInsets.all(16),
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                "Filter Notifications",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              ListTile(
                leading: const Icon(Icons.notifications_active),
                title: const Text("Unread Notifications"),
                onTap: () {
                  // TODO: Implement Unread Filter
                  Navigator.pop(context);
                },
              ),
              ListTile(
                leading: const Icon(Icons.access_time),
                title: const Text("Last 24 Hours"),
                onTap: () {
                  // TODO: Implement Last 24 Hours Filter
                  Navigator.pop(context);
                },
              ),
              ListTile(
                leading: const Icon(Icons.done_all),
                title: const Text("All Notifications"),
                onTap: () {
                  setState(() {
                    filteredNotifications = List.from(notifications);
                  });
                  Navigator.pop(context);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("Notifications", style: TextStyle(color: Colors.white)),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list, color: Colors.white),
            onPressed: showFilterOptions,
          ),
        ],
      ),
      extendBodyBehindAppBar: true,
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF6A11CB), Color(0xFF2575FC)], // Gradient Background
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: TextField(
                onChanged: filterNotifications,
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  filled: true,
                  fillColor: Colors.white.withOpacity(0.2),
                  prefixIcon: const Icon(Icons.search, color: Colors.white),
                  hintText: "Search notifications...",
                  hintStyle: const TextStyle(color: Colors.white70),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(20),
                    borderSide: BorderSide.none,
                  ),
                ),
              ),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: filteredNotifications.length,
                itemBuilder: (context, index) {
                  final notification = filteredNotifications[index];
                  return Card(
                    color: Colors.white.withOpacity(0.9),
                    margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                    child: ListTile(
                      leading: CircleAvatar(
                        backgroundColor: Colors.blueAccent,
                        child: const Icon(Icons.notifications, color: Colors.white),
                      ),
                      title: Text(notification["title"]!, style: const TextStyle(fontWeight: FontWeight.bold)),
                      subtitle: Text(notification["message"]!),
                      trailing: Text(notification["time"]!, style: const TextStyle(color: Colors.grey)),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
