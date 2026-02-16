import ImageUploader from "@/components/ImageUploader";

export default function Home() {
  return (
    <main className="container py-5">
      <h1 className="mb-4">AI Image Caption Generator</h1>
      <p className="text-muted">
        Upload an image and generate an AI-based caption.
      </p>

      <ImageUploader />
    </main>
  );
}
