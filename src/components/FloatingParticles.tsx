const FloatingParticles = () => {
  return (
    <div className="floating-particles" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, index) => (
        <span key={index} className={`particle particle-${index + 1}`} />
      ))}
    </div>
  );
};

export default FloatingParticles;
