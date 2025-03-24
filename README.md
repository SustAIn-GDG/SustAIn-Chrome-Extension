# 🌱 SustAIn — Sustainable AI Usage Metrics

**A Chrome extension and reusable React component library that provides real-time sustainability metrics while using websites powered by generative AI.**

> 🌍 **"As the world races toward AI integration, the invisible environmental cost of generative AI remains overlooked."**  
> This project was born out of the urgent need to make sustainability transparent—empowering users and developers to understand, measure, and reduce their carbon footprint while using AI tools.  
> By revealing the environmental metrics behind every query, we are not just building technology—we are fostering responsible innovation. ⚡


## 🚀 Overview

SustAIn is designed to make users aware of the **carbon footprint** and **power efficiency** involved in using AI-powered tools online. It works in real time, processing queries through a lightweight classification model hosted on GCP, and computes sustainability metrics using geo and time-based data.

The project includes:

- A **Chrome Extension** that overlays sustainability insights while users interact with AI services.
- A **React Component Library** (built with TypeScript) that can be integrated into other platforms for sustainability tracking.


## ✨ Features

- 🌍 Real-time estimation of carbon emissions using the Electricity Maps API.
- 📍 Geolocation-based datacenter identification via IP-API.
- ⏰ PUE (Power Usage Effectiveness) computation using timezone data (TimeAPI).
- 🧠 Custom AI query classification model built with AutoML and deployed on GCP Vertex AI.
- 🔌 Lightweight, no-Large Language Model (LLM) dependency — we train our own small ML model to reduce compute & emissions.
- 🧩 Chrome extension to monitor sustainability directly in the browser.
- 📦 Reusable and type-safe React components (published to npm).


## 🌍 Impact & Use Cases

- Encourages environmentally-conscious AI usage.
- Helps organizations measure their AI-driven digital sustainability.
- Serves researchers looking to evaluate energy efficiency of AI services.


## 🧭 Project Workflow Diagram

The following diagram outlines the overall system architecture and component interactions:

![workflow diagram](https://github.com/user-attachments/assets/32289700-86c4-43fe-8faf-91b24bfd34a8)


> ⚙️ The diagram captures:
> - How browser extension and React components interact with the backend
> - Data preprocessing and classification pipeline on GCP
> - API integrations with Electricity Maps, IP-API, and TimeAPI
> - Model training via AutoML and deployment via Vertex AI


## 🧰 Tech Stack

| Layer           | Technologies                                                                 |
|-----------------|------------------------------------------------------------------------------|
| Frontend        | React, TypeScript                                                            |
| Chrome Extension| React, Manifest v3                                                           |
| Backend         | Express JS                                                                   |
| ML Pipeline     | GCP Vertex AI, AutoML                                                        |
| External APIs   | Electricity Maps, IP-API, TimeAPI                                            |
| DevOps & Hosting| Google Cloud Platform (GCP), npm (for component publishing)                  |


## 📦 Related Repositories

| Repository Name                        | Description                                     | Link |
|----------------------------------------|-------------------------------------------------|------|
| **SustAIn-Chrome-Extension**           | Chrome extension codebase                       | [GitHub Link](https://github.com/SustAIn-GDG/SustAIn-Chrome-Extension) |
| **SustAIn-Backend**                    | Backend server for handling queries & metrics   | [GitHub Link](https://github.com/SustAIn-GDG/SustAIn-Backend) |
| **Documentation**                      | Complete project documentation repo             | [GitHub Link](https://github.com/SustAIn-GDG/Documentation) |
| **SustAIn-AI-model-experiment**        | Dataset synthesis and aggregation               | [GitHub Link](https://github.com/SustAIn-GDG/SustAIn-AI-model-experiment) |


## 🔮 Future Enhancements

To maximize the reach and impact of our sustainability insights, we plan to extend the solution through the following future enhancements:

- 📱 **Mobile-Centric Integration with Conversational AI Platforms**  
  Extend sustainability insights to mobile environments by integrating with AI-powered mobile applications like ChatGPT and Google Assistant—empowering users with real-time environmental impact feedback during AI interactions on their smartphones.

- 🌐 **Cross-Platform Support for Generative AI Services**  
  Extend compatibility beyond the browser to include popular generative AI platforms and tools, ensuring sustainability insights are accessible regardless of where users engage with AI.

- ☁️ **Deep Integration with Cloud Infrastructure Providers**  
  Collaborate with major cloud platforms (e.g., AWS, Google Cloud, Azure) to provide deployment engineers with granular, region-specific sustainability analytics for model training and inference workloads.

These future directions aim to embed sustainability awareness natively into AI usage workflows—empowering both end-users and technical teams to make environmentally responsible choices.


## 👥 Team

- **Thanus Kumaar A.** – Full Stack Developer, ML Engineer
- **Tharun Kumarr A.** - Full Stack Developer, ML Engineer

❤️ Made with love from team SustAIn


## 📜 License
© 2025 Team SustAIn. All rights reserved.

This project and its source code are the intellectual property of Team SustAIn.  
Unauthorized copying, distribution, modification, or usage in any form is strictly prohibited.
