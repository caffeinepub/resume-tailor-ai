import { useMutation } from '@tanstack/react-query';
import { useActor } from '../../../hooks/useActor';
import type { Resume } from '../../../backend';

interface TailorResumeParams {
  baseResume: Resume;
  jobDescription: string;
}

export function useTailorResumeMutation() {
  const { actor } = useActor();

  return useMutation<Resume, Error, TailorResumeParams>({
    mutationFn: async ({ baseResume, jobDescription }) => {
      if (!actor) {
        throw new Error('Backend service is not available. Please refresh the page and try again.');
      }

      // Only validate that job description is provided
      // Name is optional and will be inferred if possible
      if (!jobDescription.trim()) {
        throw new Error('Please provide a job description.');
      }

      try {
        const result = await actor.tailorResume(baseResume, jobDescription);
        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to tailor resume: ${error.message}`);
        }
        throw new Error('An unexpected error occurred while tailoring your resume. Please try again.');
      }
    },
  });
}
