import { showSection } from "./dome.js";

const aboutSection = document.getElementById('aboutUsSection');
aboutSection.remove();

export function showAboutPage() {
    showSection(aboutSection);
}