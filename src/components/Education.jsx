import React from 'react';
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { Highlighter } from "@/components/ui/highlighter";

export default function Education() {
  return (
    <section id="education" className="w-full bg-white text-black pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="inline-block mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-pixel">
              <Highlighter action="underline" color="#FFD700">
                Qualifications
              </Highlighter>
            </h2>
          </div>
          <div className="relative flex max-w-lg mx-auto flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-4">
            <Tree
              className="w-full bg-background overflow-hidden rounded-md"
              initialExpandedItems={["Education", "Certifications"]}
            >
              <Folder element="My Education" value="Education">
                <Folder element="Universidad de Valencia" value="UV">
                  <File value="UV-II">
                    <p>Computer Engineering (2009 – 2015)</p>
                  </File>
                </Folder>
              </Folder>
              <Folder element="Selected Training" value="Certifications">
                <Folder element="Startups Institute SL" value="StartupsInstitute">
                  <File value="SI-CTO">
                    <p>CTO and Technology Leadership (2024)</p>
                  </File>
                </Folder>
                <Folder element="Platzi" value="Platzi-Cert">
                  <File value="Platzi-Mentoring">
                    <p>Mentoring and Coaching for Leaders (2024)</p>
                  </File>
                  <File value="Platzi-EngMgmt">
                    <p>Engineering Management (2022)</p>
                  </File>
                </Folder>
                <Folder element="Coursera" value="Coursera">
                  <File value="Coursera-GenAI">
                    <p>Generative AI Applications Specialist (2025)</p>
                  </File>
                </Folder>
                <Folder element="Scrum Manager" value="ScrumManager">
                  <File value="SM-Acreditado">
                    <p>Scrum Manager – Accredited</p>
                  </File>
                </Folder>
              </Folder>
            </Tree>
          </div>
        </div>
      </div>
    </section>
  );
}