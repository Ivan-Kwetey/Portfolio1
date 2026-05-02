function FixedSkillsOverlay() {
  return (
    <div className="fixed-skills-overlay" aria-hidden="true">
      <div className="fixed-skills-column">
        <div className="case-redesign-skill-group">
          <p className="case-redesign-skill-item">RESEARCH</p>
          <p className="case-redesign-skill-item">PROTOTYPING</p>
          <p className="case-redesign-skill-item">DESIGN</p>
        </div>
        <div className="case-redesign-skill-group">
          <p className="case-redesign-skill-item">WIREFRAMING</p>
          <p className="case-redesign-skill-item">TESTING</p>
        </div>
      </div>

      <div className="fixed-skills-column">
        <div className="case-redesign-skill-group">
          <p className="case-redesign-skill-item">UX WRITING</p>
          <p className="case-redesign-skill-item">VISUAL SYSTEM</p>
          <p className="case-redesign-skill-item">INTERACTION</p>
        </div>
        <div className="case-redesign-skill-group">
          <p className="case-redesign-skill-item">HANDOFF</p>
          <p className="case-redesign-skill-item">IMPACT</p>
        </div>
      </div>
    </div>
  )
}

export default FixedSkillsOverlay
