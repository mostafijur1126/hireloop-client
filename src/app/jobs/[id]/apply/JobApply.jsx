"use client";

import React, { useState } from "react";
import {
  Form,
  TextField,
  TextArea,
  Label,
  Input,
  Button,
  toast,
} from "@heroui/react";
import { Link } from "@gravity-ui/icons";
import { submitApplication } from "@/lib/actions/application";

const JobApply = ({ job, applicant }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log(applicant);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const applicationData = {
      jobId: job._id,
      jobTitle: job?.title,
      companyName: job?.companyName,
      applicantId: applicant.id,
      applicantName: applicant.name,
      applicantEmail: applicant.email,
      resumeUrl: formData.resumeUrl,
      portfolioUrl: formData.portfolioUrl,
      linkedinUrl: formData.linkedinUrl,
      coverLetter: formData.coverLetter,
    };

    try {
      setIsSubmitting(true);

      const res = await submitApplication(applicationData);
      if (res.insertedId) {
        toast.success("Application submitted successfully!");
      }
      // console.log(res);

      // await fetch("/api/applications", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(applicationData),
      // });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            Apply for {job.title}
          </h2>

          <p className="mt-2 text-zinc-400">
            Submit your resume and any additional information you'd like the
            recruiter to see.
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-6">
          <TextField isRequired name="resumeUrl">
            <Label>Resume Link *</Label>

            <div className="relative">
              <Link
                width={16}
                height={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />

              <Input
                placeholder="https://drive.google.com/..."
                className="pl-10"
              />
            </div>
          </TextField>

          <TextField name="portfolioUrl">
            <Label>Portfolio Website</Label>

            <Input placeholder="https://yourportfolio.com" />
          </TextField>

          <TextField name="linkedinUrl">
            <Label>LinkedIn Profile</Label>

            <Input placeholder="https://linkedin.com/in/username" />
          </TextField>

          <textarea
            name="coverLetter"
            placeholder="Tell us anything you'd like recruiters to know..."
            className="w-full rounded-lg border p-3"
            defaultValue=""
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" color="primary" isLoading={isSubmitting}>
              Apply Now
            </Button>

            <Button type="reset" variant="bordered">
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default JobApply;
