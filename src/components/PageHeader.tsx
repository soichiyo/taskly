type PageHeaderProps = {
  title: string;
  description: string;
};

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "20px 0",
        marginBottom: "20px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            color: "#1f2937",
            fontSize: "32px",
            fontWeight: "bold",
            margin: "0 0 8px 0",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "#6b7280",
            fontSize: "16px",
            margin: "0",
          }}
        >
          {description}
        </p>
      </div>
    </header>
  );
};
