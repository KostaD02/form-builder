export class User {
  public objectSchema!: {
    type: 'object';
    name: 'profile';
    label: 'Student profile';
    properties: [
      {
        type: 'string';
        name: 'fullName';
        label: 'Full name';
        required: true;
      },
      {
        type: 'string';
        name: 'email';
        label: 'Email';
        inputType: 'email';
        required: true;
      },
      {
        type: 'enum';
        name: 'country';
        label: 'Country';
        options: [
          {
            value: 'ge';
            label: 'Georgia';
          },
          {
            value: 'ua';
            label: 'Ukraine';
          }
        ];
      },
      {
        type: 'string';
        name: 'phone';
        label: 'Phone';
        inputType: 'tel';
        required: true;
        minLength: 8;
        maxLength: 20;
        pattern: '^\\d{8,20}$';
      },
      {
        type: 'number';
        name: 'universityYears';
        label: 'Finished university years';
        integer: true;
        minimum: 1;
        maximum: 6;
      },
      {
        type: 'array';
        name: 'technologies';
        label: 'Primary technologies';
        required: true;
        item: {
          type: 'object';
          name: 'technology';
          properties: [
            {
              type: 'string';
              label: 'Technology';
              name: 'technology';
              required: true;
            },
            {
              type: 'number';
              label: 'Experience (years)';
              name: 'experience';
              integer: true;
              required: true;
            }
          ];
        };
      },
      {
        name: 'currentPosition';
        type: 'string';
        label: 'Current job position';
        required: false;
      },
      {
        type: 'string';
        name: 'plans';
        label: 'Plans for the next year';
        required: true;
        multiline: true;
      },
      {
        type: 'object';
        name: 'links';
        label: 'Links';
        properties: [
          {
            type: 'string';
            name: 'github';
            label: 'GitHub profile';
            required: true;
          },
          {
            type: 'string';
            name: 'linkedin';
            label: 'LinkedIn profile';
            required: false;
          },
          {
            type: 'string';
            name: 'website';
            label: 'Public website';
            required: false;
          },
          {
            type: 'string';
            name: 'cv';
            label: 'Link to CV';
            required: false;
          }
        ];
      },
      {
        type: 'array';
        name: 'projects';
        label: 'Links to your projects';
        required: true;
        item: {
          type: 'object';
          name: 'project';
          properties: [
            {
              type: 'string';
              name: 'name';
              label: 'Name';
              required: true;
            },
            {
              type: 'string';
              name: 'link';
              label: 'Link';
              required: true;
            }
          ];
        };
      },
      {
        type: 'boolean';
        name: 'haveComputer';
        label: 'Have a computer and internet';
      }
    ];
  };
}
