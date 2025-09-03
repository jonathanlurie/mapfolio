export type CardOptions = {
  title?: string,
  imageUrl?: string,
  description?: string,
  link?: string,
  linkText?: string,
};


export class Card extends HTMLElement {
  constructor(options: CardOptions = {}) {
      super();
      this.setAttribute("image", options.imageUrl ?? 'https://via.placeholder.com/300x200?text=No+Image')
      this.setAttribute("title", options.title ?? "Example")
      this.setAttribute("description", options.description ?? "")
      this.setAttribute("link", options.link ?? "/")
      this.setAttribute("link-text", options.linkText ?? "Show more")
      this.attachShadow({ mode: 'open' });
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
      return ['image', 'title', 'description', 'link', 'link-text'];
  }

  // Called when component is added to DOM
  connectedCallback() {
      this.render();
  }

  // Called when observed attributes change
  attributeChangedCallback() {
      this.render();
  }

  // Get attribute values with defaults
  get imageUrl() {
      return this.getAttribute('image');
  }

  get cardTitle() {
      return this.getAttribute('title');
  }

  get cardDescription() {
      return this.getAttribute('description');
  }

  get cardLink() {
      return this.getAttribute('link');
  }

  get linkText() {
      return this.getAttribute('link-text');
  }

  // Render the component
  render() {
    if (!this.shadowRoot) {
      return;
    }

    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: 100%;
            }
            
            .card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            
            .card:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
            }
            
            .card-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                background-color: #f0f0f0;
            }
            
            .card-content {
                padding: 20px;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
            }
            
            .card-title {
                font-size: 1.25rem;
                font-weight: bold;
                color: #333;
                margin: 0 0 12px 0;
                line-height: 1.3;
            }
            
            .card-description {
                color: #666;
                line-height: 1.6;
                margin: 0 0 20px 0;
                flex-grow: 1;
            }
            
            .card-link {
                display: inline-flex;
                align-items: center;
                color: #007bff;
                text-decoration: none;
                font-weight: 500;
                padding: 8px 16px;
                border: 2px solid #007bff;
                border-radius: 6px;
                transition: all 0.2s ease;
                align-self: flex-start;
            }
            
            .card-link:hover {
                background-color: #007bff;
                color: white;
                transform: translateX(2px);
            }
            
            .card-link::after {
                content: '→';
                margin-left: 8px;
                transition: transform 0.2s ease;
            }
            
            .card-link:hover::after {
                transform: translateX(2px);
            }
        </style>
        
        <div class="card">
            <img src="${this.imageUrl}" alt="${this.cardTitle}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${this.cardTitle}</h3>
                <p class="card-description">${this.cardDescription}</p>
                <a href="${this.cardLink}" class="card-link" target="_blank" rel="noopener">
                    ${this.linkText}
                </a>
            </div>
        </div>
    `;
  }
}

// Register the custom element
customElements.define('project-card', Card);
