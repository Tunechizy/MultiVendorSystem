import 'package:flutter/material.dart';
import 'product_details.dart';

class ProductsPage extends StatelessWidget {
  const ProductsPage({super.key});

  final List<Map<String, String>> products = const [
    {
      "name": "Smartphone",
      "price": "\$699",
      "image": "https://via.placeholder.com/150",
      "description": "A high-end smartphone with an amazing camera.",
    },
    {
      "name": "Laptop",
      "price": "\$1299",
      "image": "https://via.placeholder.com/150",
      "description": "Powerful laptop for work and gaming.",
    },
    {
      "name": "Headphones",
      "price": "\$199",
      "image": "https://via.placeholder.com/150",
      "description": "Noise-canceling headphones with great sound.",
    },
  ];

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
        title: const Text("Products", style: TextStyle(color: Colors.white)),
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
        child: ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: products.length,
          itemBuilder: (context, index) {
            final product = products[index];

            return Card(
              color: Colors.white.withOpacity(0.9),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
              margin: const EdgeInsets.symmetric(vertical: 10),
              child: ListTile(
                leading: Image.network(product["image"]!, width: 50, height: 50, fit: BoxFit.cover),
                title: Text(product["name"]!, style: const TextStyle(fontWeight: FontWeight.bold)),
                subtitle: Text(product["price"]!, style: const TextStyle(color: Colors.green)),
                trailing: const Icon(Icons.arrow_forward_ios, color: Colors.blue),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => ProductDetailsPage(product: product),
                    ),
                  );
                },
              ),
            );
          },
        ),
      ),
    );
  }
}
