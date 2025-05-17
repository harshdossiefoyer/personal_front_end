
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Project name must be at least 3 characters.",
  }),
  url: z.string().url({ 
    message: "Please enter a valid URL." 
  }),
  description: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof formSchema>;

interface AddProjectFormProps {
  onSubmit: (values: ProjectFormValues) => void;
  onCancel: () => void;
}

const AddProjectForm = ({ onSubmit, onCancel }: AddProjectFormProps) => {
  const { toast } = useToast();
  
  // Initialize the form
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: 'https://',
      description: '',
    },
  });

  // Handle form submission
  const handleSubmit = (values: ProjectFormValues) => {
    try {
      onSubmit(values);
      toast({
        title: "Project added successfully!",
        description: `${values.name} has been added to your projects`,
      });
      form.reset();
    } catch (error) {
      console.error("Failed to add project:", error);
      toast({
        title: "Failed to add project",
        description: "There was an error adding your project",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-in">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Website" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Brief description of your project" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-accent hover:bg-accent/90">
            Add Project
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProjectForm;
