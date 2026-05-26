"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TextField,
  Label,
  Input,
  InputGroup,
  Button,
  Card,
} from "@heroui/react";
// Gravity UI Icons
import { Eye, EyeSlash, ArrowLeft } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
// Assuming you have your better-auth client configured here

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Something went wrong. Please try again.",
        );
      } else {
        setSuccessMessage(
          "Account created successfully! Check your email or log in.",
        );
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-zinc-900">
      {/* Go Back Link */}
      <div className="mb-4 w-full max-w-md flex justify-start">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* HeroUI v3 Card Container */}
      <Card className="w-full max-w-md p-2 shadow-2xl">
        <Card.Header className="flex flex-col items-start px-6 pt-6">
          <Card.Title className="text-2xl font-bold">
            Create an account
          </Card.Title>
          <Card.Description className="text-small text-default-500">
            Enter your details to get started
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            {/* Name Input */}
            <TextField name="name" required>
              <Label className="text-sm font-medium text-default-700">
                Name
              </Label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </TextField>

            {/* Email Input */}
            <TextField name="email" type="email" required>
              <Label className="text-sm font-medium text-default-700">
                Email
              </Label>
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </TextField>

            {/* Password Input with Toggle */}
            <TextField name="password" required>
              <Label className="text-sm font-medium text-default-700">
                Password
              </Label>
              <InputGroup className="w-full">
                <Input
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <InputGroup.Suffix>
                  <button
                    className="focus:outline-none text-default-400 hover:text-default-600 transition-colors"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                    disabled={isLoading}
                  >
                    {isVisible ? (
                      <EyeSlash className="text-xl pointer-events-none" />
                    ) : (
                      <Eye className="text-xl pointer-events-none" />
                    )}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>

            {/* Error Message Feedback */}
            {errorMessage && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50">
                {errorMessage}
              </div>
            )}

            {/* Success Message Feedback */}
            {successMessage && (
              <div className="p-3 text-sm text-green-600 bg-green-50 rounded-xl border border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50">
                {successMessage}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2 font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          {/* Navigation link to sign-in page */}
          <div className="text-center mt-4">
            <p className="text-small text-default-500">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-primary hover:underline font-medium"
              >
                Log In
              </Link>
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
