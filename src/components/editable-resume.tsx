"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";

export default function ResumeBuilder() {
  interface ResumeData {
    personalinformation: {
      name: string;
      email: string;
      phone: string;
    };
    education: {
      highestEducation: string;
      school: string;
      field: string;
      passingYear: string;
    };
    skills: string[];
    experience: {
      company: string;
      position: string;
      year: string;
    };
  }
  // Define state for form fields
  const [formData, setFormData] = useState<ResumeData>({
    personalinformation: {
      name: "",
      email: "",
      phone: "",
    },
    education: {
      highestEducation: "",
      school: "",
      field: "",
      passingYear: "",
    },
    skills: [],
    experience: {
      company: "",
      position: "",
      year: "",
    },
  });

  // Define state to store submitted data
  const [submittedData, setSubmittedData] = useState<ResumeData | null>(null);
  const [newSkill, setNewSkill] = useState("");
  const [isediting, setIsEditing] = useState(false);
  const [isEditField, setIsEditField] = useState("");

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<
      | HTMLFormElement
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name in formData.education) {
      setFormData((prev) => ({
        ...prev,
        education: { ...prev.education, [name]: value },
      }));
    } else if (name in formData.experience) {
      setFormData((prev) => ({
        ...prev,
        experience: { ...prev.experience, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, personalinformation:{...prev.personalinformation,[name]: value }}));
    }
  };

  const handleSave = () => {
    setSubmittedData((prevData) => {
      if (!prevData) return null; // Ensure prevData is not null
      
      // Update only the specific field
    const updatedData = { ...prevData };

    if (isEditField in formData.personalinformation) {
      updatedData.personalinformation[isEditField as keyof typeof formData.personalinformation] =
        formData.personalinformation[isEditField as keyof typeof formData.personalinformation];
    } else if (isEditField in formData.education) {
      updatedData.education[isEditField as keyof typeof formData.education] =
        formData.education[isEditField as keyof typeof formData.education];
    } else if (isEditField in formData.experience) {
      updatedData.experience[isEditField as keyof typeof formData.experience] =
        formData.experience[isEditField as keyof typeof formData.experience];
    }

    return updatedData;
  });
    setIsEditing(false);
    setFormData({
      personalinformation: {
        name: "",
        email: "",
        phone: "",
      },
      education: {
        highestEducation: "",
        school: "",
        field: "",
        passingYear: "",
      },
      skills: [],
      experience: {
        company: "",
        position: "",
        year: "",
      },
    });
  };

  const handleEditClick = (field: string) => {
    setIsEditing(true);
    setIsEditField(field); // Set the specific field being edited
  };

  // Handle skill input change
  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSkill(e.target.value);
  };

  // Add skill to the list
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill(""); // Clear the input field after adding
    }
  };

  // Remove skill from the list
  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills.splice(index, 1);
      return {
        ...prev,
        skills: updatedSkills,
      };
    });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({
      personalinformation: {
        name: "",
        email: "",
        phone: "",
      },
      education: {
        highestEducation: "",
        school: "",
        field: "",
        passingYear: "",
      },
      skills: [],
      experience: {
        company: "",
        position: "",
        year: "",
      },
    });
  };

  return (
    <div className="min-h-screen p-10">
      <h1 className="sm:text-5xl text-3xl font-bold font-heading text-center text-blue-400 sm:mb-10 mb-6">
        Dynamic Resume Builder
      </h1>
      <div className="shadow-2xl sm:p-8 p-4 sm:p-10 max-w-5xl w-full mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg mb-8 sm:p-6 p-4 space-y-5">
            <div>
              <h1 className="sm:text-2xl text-lg text-white font-bold mb-10 font-subheadings">
                Personal Information
              </h1>
              <label className="block sm:text-lg text-sm text-white">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.personalinformation.name}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.personalinformation.email}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">
                Phone:
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.personalinformation.phone}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg mb-8 sm:p-6 p-4 space-y-4">
            <h1 className="sm:text-2xl text-lg text-white font-bold mb-10 font-subheadings">
              Education
            </h1>
            <div>
              <label className="block sm:text-lg text-sm text-white">
                Highest Education:
              </label>
              <select
                name="highestEducation"
                value={formData.education.highestEducation}
                onChange={handleChange}
                className="sm:p-2 p-1 w-full rounded cursor-pointer bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
              >
                <option value="" disabled>
                  Select your highest education
                </option>
                <option value="Matric">Matriculation</option>
                <option value="Inter">Intermediate</option>
                <option value="Graduation">Bachelors</option>
                <option value="Graduation">Masters</option>
                <option value="MPhil">MPhil</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">
                School:
              </label>
              <input
                type="text"
                name="school"
                value={formData.education.school}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">
                Field:
              </label>
              <input
                type="text"
                name="field"
                value={formData.education.field}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">
                Passing Year:
              </label>
              <input
                type="text"
                name="passingYear"
                value={formData.education.passingYear}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg mb-8 sm:p-6 p-4 space-y-4">
            <h1 className="sm:text-2xl text-lg text-white font-bold mb-10 font-subheadings">
              Skills
            </h1>
            <label className="block sm:text-lg text-sm text-gray-400">
              List Your Skills Here
            </label>
            <div className="flex gap-4 flex-col sm:flex-row">
              <input
                type="text"
                value={newSkill}
                onChange={handleSkillChange}
                className="sm:p-1 w-full rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
              />
              <Button
                type="button"
                onClick={handleAddSkill}
                className="sm:text-md text-sm hover:bg-gray-500 hover:text-blue-300 sm:w-1/3 h-[2rem]"
              >
                Add Skill
              </Button>{" "}
            </div>
            {/* Display added skills */}
            <div className="mt-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex bg-gray-200 text-black px-2 py-1 rounded-2xl m-1 relative"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="ml-2 text-red-500 hover:text-red-700 px-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg mb-8 sm:p-6 p-4 space-y-4">
            <h1 className="sm:text-2xl text-lg text-white font-bold mb-10 font-subheadings">
              Experience
            </h1>
            <div>
              <label className="block sm:text-lg text-sm text-white">
                Comapny:
              </label>
              <input
                type="text"
                name="company"
                value={formData.experience.company}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">
                Position:
              </label>
              <input
                type="text"
                name="position"
                value={formData.experience.position}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">
                Year:
              </label>
              <input
                type="text"
                name="year"
                value={formData.experience.year}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
          <Button className="sm:text-lg text-md font-bold flex justify-center items-center hover:bg-gray-500 hover:text-black w-full sm:h-[4rem] h-[3rem]">
            Generate Your Resume
          </Button>
        </form>
      </div>

      <div>
        {submittedData && (
          <div className="bg-white text-black mt-10 border-4 border-blue-400 shadow-2xl sm:p-6 p-4 max-w-5xl w-full mx-auto">
            <h2 className="text-5xl text-center font-bold mb-10 p-4">Resume</h2>

            <div className="sm:grid sm:grid-cols-2 sm:gap-10">
              {/* Personal Information */}
              <div className="flex flex-col gap-2 mb-10">
                <div>
                  <hr className="border-2 border-blue-400 rounded-lg sm:w-[22rem] mt-2 mb-3" />
                  <h1 className="sm:text-3xl text-xl text-gray-800">
                    ➢ Personal Information
                  </h1>
                  <hr className="border-2 border-blue-400 rounded-lg sm:w-[22rem] mt-2 mb-6" />
                </div>

                {["name", "email", "phone"].map((field) => (
                  <div key={field}>
                    {isediting && isEditField === field ? (
                      <div className="flex flex-row items-center gap-2">
                        <h1 className="text-sm text-gray-500 capitalize">
                          {field}:
                        </h1>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={
                            formData.personalinformation[
                              field as keyof typeof formData.personalinformation
                            ]
                          }
                          onChange={handleChange}
                          className="p-1 w-3/4 rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
                          autoFocus
                          required
                        />
                      </div>
                    ) : (
                      <h1 className="text-sm text-gray-500">
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                        <span
                          className="sm:text-xl text-lg text-gray-700 font-bold cursor-text"
                          onClick={() => handleEditClick(field)}
                        >
                          {" "} {
                            submittedData.personalinformation[
                              field as keyof typeof submittedData.personalinformation
                            ]
                          }
                        </span>
                      </h1>
                    )}
                  </div>
                ))}
              </div>

              {/* Education Information */}
              <div className="flex flex-col gap-2 mb-10">
                <div>
                  <hr className="border-2 border-blue-400 rounded-lg sm:w-[12rem] mt-2 mb-3" />
                  <h1 className="sm:text-3xl text-xl text-gray-800">
                    ➢ Education
                  </h1>
                  <hr className="border-2 border-blue-400 rounded-lg sm:w-[12rem] mt-2 mb-3" />
                </div>

                {["highestEducation", "school", "field", "passingYear"].map(
                  (field) => (
                    <div key={field}>
                      {isediting && isEditField === field ? (
                        <div className="flex flex-row items-center gap-2">
                          <h1 className="text-sm text-gray-500 capitalize">
                            {field}:
                          </h1>
                          <input
                            type="text"
                            name={field}
                            value={
                              formData.education[
                                field as keyof typeof formData.education
                              ]
                            }
                            onChange={handleChange}
                            className="p-1 w-3/4 rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <h1 className="text-sm text-gray-500">
                          {field}:
                          <span
                            className="sm:text-xl text-md text-black font-bold"
                            onClick={() => handleEditClick(field)}
                          >
                            {" "} {
                              submittedData.education[
                                field as keyof typeof submittedData.education
                              ]
                            }
                          </span>
                        </h1>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-2 mb-10">
                <div>
                  <hr className="border-2 border-blue-400 rounded-lg sm:w-[8rem] mt-2 mb-3" />
                  <h1 className="sm:text-3xl text-xl text-gray-800">
                    ➢ Skills
                  </h1>
                  <hr className="border-2 border-blue-400 rounded-lg sm:w-[8rem] mt-2 mb-3" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {submittedData.skills.map((skill, index) => (
                    <div
                      className="bg-gray-300 sm:p-2 p-1 text-center text-sm rounded-full shadow-xl inline-flex justify-center items-center"
                      key={index}
                    >
                      💡 {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Information */}
              <div className="flex flex-col gap-2 mb-10">
                <div>
                  <hr className="border-2 border-blue-400 rounded-lg sm:w-[13rem] mt-2 mb-3" />
                  <h1 className="sm:text-3xl text-xl text-gray-800">
                    ➢ Experience
                  </h1>
                  <hr className="border-2 border-blue-400 rounded-lg sm:w-[13rem] mt-2 mb-3" />
                </div>

                {["company", "position", "year"].map((field) => (
                  <div key={field}>
                    {isediting && isEditField === field ? (
                      <div className="flex flex-row items-center gap-2">
                        <h1 className="text-sm text-gray-500 capitalize">
                          {field}:
                        </h1>
                        <input
                          type="text"
                          name={field}
                          value={
                            formData.experience[
                              field as keyof typeof formData.experience
                            ]
                          }
                          onChange={handleChange}
                          className="p-1 w-3/4 rounded bg-blue-300 text-white border-2 border-transparent focus:border-blue-600 focus:outline-none"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <h1 className="text-sm text-gray-500">
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                        <span
                          className="sm:text-xl text-md text-black font-bold"
                          onClick={() => handleEditClick(field)}
                        >
                          {" "} {
                            submittedData.experience[
                              field as keyof typeof submittedData.experience
                            ]
                          }
                        </span>
                      </h1>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {isediting && (
              <Button
                onClick={handleSave}
                className="sm:text-lg text-md font-bold flex justify-center items-center hover:bg-gray-500 hover:text-black sm:w-1/3 md:w-1/2 w-full sm:h-[4rem] h-[3rem]"
              >
                Save
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
