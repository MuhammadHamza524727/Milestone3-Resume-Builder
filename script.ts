declare const html2pdf: any;

const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLElement;
const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement;
const resumeName = document.getElementById("resumeName") as HTMLHeadingElement;
const resumeEmail = document.getElementById(
  "resumeEmail"
) as HTMLParagraphElement;
const resumePhone = document.getElementById(
  "resumePhone"
) as HTMLParagraphElement;
const resumeEducation = document.getElementById(
  "resumeEducation"
) as HTMLParagraphElement;
const resumeWorkExperience = document.getElementById(
  "resumeWorkExperience"
) as HTMLParagraphElement;
const resumeSkills = document.getElementById(
  "resumeSkills"
) as HTMLParagraphElement;

const resumefacebook = document.getElementById(
  "resumefacebook"
) as HTMLInputElement;
const resumeinstagram = document.getElementById(
  "resumeinstagram"
) as HTMLInputElement;
const resumelinkdin = document.getElementById(
  "resumelinkdin"
) as HTMLInputElement;

const downloadPdfButton = document.getElementById(
  "download-pdf"
) as HTMLButtonElement;
const backButton = document.getElementById("backButton") as HTMLButtonElement;
const editButton = document.getElementById("editButton") as HTMLButtonElement;
const resumeContent = document.getElementById(
  "resumeContent"
) as HTMLDivElement;
const shareLinkButton = document.getElementById(
  "shareLinkButton"
) as HTMLButtonElement;

form.addEventListener("submit", async (event: Event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const degree = (document.getElementById("degree") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLInputElement)
    .value;
  const workExperience = (
    document.getElementById("workExperience") as HTMLTextAreaElement
  ).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement)
    .value;
  const facebooklinks = (
    document.getElementById("facebooklinks") as HTMLInputElement
  ).value;
  const instagramlinks = (
    document.getElementById("instagramlinks") as HTMLInputElement
  ).value;
  const linkdinlinks = (
    document.getElementById("linkdinlinks") as HTMLInputElement
  ).value;
  const photoInput = document.getElementById("photo") as HTMLInputElement;

  const photoFile = photoInput.files ? photoInput.files[0] : null;
  let photoBase64 = "";

  if (photoFile) {
    photoBase64 = await fileToBase64(photoFile);
    localStorage.setItem("resumePhoto", photoBase64);
    resumePhoto.src = photoBase64;
  }

  if (photoFile && !photoFile.type.startsWith("image/")) {
    alert("Please upload a valid image file.");
    return;
  }

  resumeName.textContent = name;
  resumeEmail.textContent = `Email: ${email}`;
  resumePhone.textContent = `Phone: ${phone}`;
  resumeEducation.textContent = `${degree} from ${education}`;
  resumeWorkExperience.textContent = workExperience;
  resumeSkills.textContent = skills;
  resumefacebook.textContent = facebooklinks;
  resumeinstagram.textContent = instagramlinks;
  resumelinkdin.textContent = linkdinlinks;
  document.querySelector(".container")?.classList.add("hidden");
  resumePage.classList.remove("hidden");
  const queryParams = new URLSearchParams({
    name: name,
    email: email,
    phone: phone,
    degree: degree,
    education: education,
    workExperience: workExperience,
    skills: skills,
    facebook: facebooklinks,
    instagram: instagramlinks,
    linkdin: linkdinlinks,
  });


});
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}



function updateFormFromResume() {
  const [degree, education] =
    resumeEducation.textContent?.split(" from ") || [];
  (document.getElementById("name") as HTMLInputElement).value =
    resumeName.textContent || "";
  (document.getElementById("email") as HTMLInputElement).value =
    resumeEmail.textContent?.replace("Email: ", "") || "";
  (document.getElementById("phone") as HTMLInputElement).value =
    resumePhone.textContent?.replace("Phone: ", "") || "";
  (document.getElementById("degree") as HTMLInputElement).value = degree || "";
  (document.getElementById("education") as HTMLInputElement).value =
    education || "";
  (document.getElementById("workExperience") as HTMLTextAreaElement).value =
    resumeWorkExperience.textContent || "";
  (document.getElementById("skills") as HTMLTextAreaElement).value =
    resumeSkills.textContent || "";
  (document.getElementById("facebooklinks") as HTMLInputElement).value =
    resumefacebook.textContent || "";
  (document.getElementById("instagramlinks") as HTMLInputElement).value =
    resumeinstagram.textContent || "";
  (document.getElementById("linkdinlinks") as HTMLInputElement).value =
    resumelinkdin.textContent || "";
}

