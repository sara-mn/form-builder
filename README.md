# 📝 Angular Form Builder

A **modular Form Builder project** developed with **Angular** following **Domain-Driven Design (DDD)** principles.  
This project allows creating, editing, and managing dynamic forms, providing better maintainability, scalability, and testability by separating different layers of the application.

---
## 🌐 Demo

You can view the live demo of the Form Builder hosted on GitHub Pages: [View Demo](https://sara-mn.github.io/form-builder/)

---

## ✨ Features
- 📌 Create dynamic forms with various field types (text, select, checkbox, etc.)
- 🔀 Drag & Drop to reorder fields
- ✅ Flexible validation for form fields
- 💾 Save and load forms
- 👀 Live preview of the form
- 📤 Export forms as JSON

---

## 📂 Project Structure
```plaintext
src/
┣ app/
┃ ┣ application/         # Application layer (Use Cases)
┃ ┣ domain/              # Domain entities and models
┃ ┣ infrastructure/      # Infrastructure layer
┃ ┃ ┣ api/               # API communication
┃ ┃ ┗ storage/           # Local or cloud storage
┃ ┣ presentation/        # Presentation layer (UI)
┃ ┃ ┣ core/              # Core modules
┃ ┃ ┃ ┣ guards/          # Route guards
┃ ┃ ┃ ┣ interceptors/    # HTTP interceptors
┃ ┃ ┃ ┗ services/        # General services
┃ ┃ ┣ features/          # Feature modules
┃ ┃ ┣ layout/            # Layouts and UI structure
┃ ┃ ┗ shared/            # Shared modules and components
┃ ┣ app.module.ts        # Main application module
┃ ┣ app.config.ts        # Global configuration
┃ ┗ app.route.ts         # Route definitions
┣ assets/                # Static files (CSS, images, etc.)
┗ environments/          # Environment settings (dev/prod)
```

## 🚀 Getting Started Prerequisites

- [Node.js](https://nodejs.org/) (Recommended LTS version)
- [Angular CLI](https://github.com/angular/angular-cli) (version 19.2.7)

```bash
git clone https://github.com/sara-mn/form-builder.git
cd form-builder
npm install
```
Running the Application

```bash
ng serve
```
The application will be available at 👉 http://localhost:4200/.

Build for Production

```bash
ng build --configuration production
```

## 🛠️ Technologies & Tools

- ⚡ Angular
- 🔄 RxJS
- 🎨 Angular Material
- 🏗️ Domain-Driven Design (DDD) architecture
- 📦 Optional: NgRx for state management


## ✅ Testing

Run tests with:

```bash
ng test
```

## 📄 License

This project is licensed under the MIT License.



 
