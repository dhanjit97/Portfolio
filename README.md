Dhanjit Boro — Developer Portfolio

A personal portfolio showcasing my software engineering projects, technical interests, and approach to building interactive web experiences.

The portfolio combines a neo-brutalist design system, expressive typography, interactive visualizations, and a procedural Three.js 3D experience.

Built with: React · TypeScript · Vite · Tailwind CSS · Three.js

⸻

Overview

The portfolio is designed around the concept of an Engineer’s Workbench—a digital space that presents projects, experiments, and technical ideas through a distinctive visual identity.

Design Principles

* Neo-brutalist aesthetics: Strong borders, geometric layouts, and tactile offset shadows.
* Editorial typography: Bricolage Grotesque, Plus Jakarta Sans, and JetBrains Mono.
* Intentional color palette: Warm paper backgrounds, deep ink, chartreuse accents, and signal vermilion.
* Interactive experiences: Procedural 3D graphics, project visualizations, and animated interface elements.
* Accessibility: Keyboard-friendly interactions, readable contrast, and reduced-motion support.

⸻

Featured Projects

1. AetherLink — Optical Data Transfer

An experimental project exploring optical communication between physically separated systems using dynamic QR-code sequences.

Technical highlights

* Dynamic QR-code frame generation and streaming.
* Camera-based frame capture and processing.
* CRC-16-based frame validation and synchronization.
* Bitstream reconstruction from captured frames.

Repository: AetherLink

2. Spam Classification with DeepCNN

An experimental spam classification application using a one-dimensional convolutional neural network.

Technical highlights

* Multi-scale convolutional filters with kernel sizes of 3, 4, and 5.
* Local CPU-based inference.
* Support for interchangeable model checkpoints.

3. Wordlist Generator

A desktop utility for generating wordlists through configurable combinations and permutations.

Technical highlights

* Python-based generation using lazy iterators.
* Buffered disk writing to reduce memory consumption.
* Desktop interface built with CustomTkinter.

4. Lab Management System

A desktop application for managing laboratory schedules and preventing conflicting reservations.

Technical highlights

* Tkinter-based user interface.
* Interval-overlap checks for scheduling conflicts.
* CSV-based data persistence.

Note: Project descriptions should reflect the actual implementation and current status of each repository.

⸻

Interactive 3D Experience

The portfolio includes a procedural Three.js visualization designed around an optical data-transfer concept.

Features

* Procedurally generated 3D geometry.
* Interactive orbit controls and automatic rotation.
* Wireframe and exploded-view modes.
* Optical components, alignment markers, and calibration details.
* Visibility-aware rendering to reduce unnecessary work.
* Resource cleanup when the component unmounts.
* Respect for the user’s reduced-motion preference.

The visualization is designed to communicate engineering concepts while remaining integrated with the overall portfolio experience.

⸻

Tech Stack

Technology	Purpose
React	Component-based user interface
TypeScript	Type-safe application development
Vite	Development server and production bundling
Tailwind CSS	Utility-first styling
Three.js	Interactive 3D visualization
HTML5	Application structure
CSS	Design tokens, layout, and custom visual effects
npm	Dependency management and scripts

⸻

Getting Started

Prerequisites

Make sure you have the following installed:

* Node.js 18 or later
* npm 9 or later
* Git

Installation

Clone the repository and install its dependencies:

git clone https://github.com/dhanjit97/Portfolio.git
cd Portfolio
npm install

Development

Start the local development server:

npm run dev

Open the local URL printed by Vite in your browser. The default port is typically 5173, unless the project configuration specifies otherwise.

Production Build

Create an optimized production build:

npm run build

Preview the Production Build

npm run preview

Code Quality Checks

If a lint script is configured in package.json, run:

npm run lint

⸻





The directory tree is illustrative. Update it to match the actual files in the repository.

⸻

Documentation

Additional project documentation is available in the docs/ directory:

* CONTENT_VERIFICATION.md — Project information and content verification.
* DESIGN_EXPLORATION.md — Design decisions and visual exploration.

⸻

License

This project is distributed under the MIT License. See LICENSE for details.

Author

Dhanjit Boro

* GitHub: @dhanjit97
* Portfolio source code: Portfolio Repository

⸻

Designed and developed with a focus on engineering, experimentation, and thoughtful user experiences.
