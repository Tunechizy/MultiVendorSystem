import 'package:flutter/material.dart';

class PaymentPage extends StatefulWidget {
  const PaymentPage({super.key});

  @override
  State<PaymentPage> createState() => _PaymentPageState();
}

class _PaymentPageState extends State<PaymentPage> {
  String selectedPaymentMethod = "Credit Card";

  void selectPaymentMethod(String method) {
    setState(() {
      selectedPaymentMethod = method;
    });
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
        title: const Text("Payment", style: TextStyle(color: Colors.white)),
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
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              // Payment Options
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _buildPaymentOption("Credit Card", Icons.credit_card),
                  _buildPaymentOption("Mobile Money", Icons.phone_android),
                ],
              ),
              const SizedBox(height: 20),

              // Payment Details Form
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.9),
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: Column(
                    children: [
                      if (selectedPaymentMethod == "Credit Card") _buildCreditCardForm(),
                      if (selectedPaymentMethod == "Mobile Money") _buildMobileMoneyForm(),
                      const SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: () {
                          // TODO: Implement Payment Logic
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blueAccent,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          minimumSize: const Size(double.infinity, 50),
                        ),
                        child: const Text("Proceed to Pay", style: TextStyle(fontSize: 16, color: Colors.white)),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPaymentOption(String title, IconData icon) {
    return GestureDetector(
      onTap: () => selectPaymentMethod(title),
      child: Column(
        children: [
          CircleAvatar(
            radius: 30,
            backgroundColor: selectedPaymentMethod == title ? Colors.blueAccent : Colors.white,
            child: Icon(icon, size: 30, color: selectedPaymentMethod == title ? Colors.white : Colors.blueAccent),
          ),
          const SizedBox(height: 8),
          Text(title, style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildCreditCardForm() {
    return Column(
      children: [
        _buildTextField("Card Number", "**** **** **** ****", Icons.credit_card),
        const SizedBox(height: 10),
        Row(
          children: [
            Expanded(child: _buildTextField("Expiry Date", "MM/YY", Icons.date_range)),
            const SizedBox(width: 10),
            Expanded(child: _buildTextField("CVV", "***", Icons.lock)),
          ],
        ),
        const SizedBox(height: 10),
        _buildTextField("Cardholder Name", "John Doe", Icons.person),
      ],
    );
  }

  Widget _buildMobileMoneyForm() {
    return Column(
      children: [
        _buildTextField("Mobile Number", "+123 456 7890", Icons.phone),
        const SizedBox(height: 10),
        _buildTextField("Operator", "MTN / Airtel", Icons.account_balance),
      ],
    );
  }

  Widget _buildTextField(String label, String hint, IconData icon) {
    return TextField(
      decoration: InputDecoration(
        labelText: label,
        hintText: hint,
        prefixIcon: Icon(icon, color: Colors.blueAccent),
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide.none,
        ),
      ),
    );
  }
}
