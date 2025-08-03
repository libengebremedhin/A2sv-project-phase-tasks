describe('Bookmark Functionality', () => {
  beforeEach(() => {
    // Visit the jobs page
    cy.visit('/jobs');
  });

  context('Unauthenticated User', () => {
    it('should show disabled bookmark buttons for unauthenticated users', () => {
      // Check that bookmark buttons are disabled
      cy.get('[data-testid="bookmark-button"]').should('be.disabled');
      
      // Check that "Sign in to bookmark" text is visible
      cy.contains('Sign in to bookmark').should('be.visible');
    });

    it('should show authentication prompt when trying to bookmark', () => {
      // Try to click a bookmark button (should not work)
      cy.get('[data-testid="bookmark-button"]').first().should('be.disabled');
    });

    it('should redirect to signin when accessing bookmarks page', () => {
      cy.visit('/bookmarks');
      cy.url().should('include', '/signin');
    });
  });

  context('Authenticated User', () => {
    beforeEach(() => {
      // Mock authentication by visiting signin page and "logging in"
      cy.visit('/signin');
      
      // Fill in the signin form
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('Test123456');
      
      // Mock the API call for successful login
      cy.intercept('POST', 'https://akil-backend.onrender.com/login', {
        statusCode: 200,
        body: {
          data: {
            accessToken: 'mock-token',
            name: 'Test User',
            role: 'user'
          }
        }
      }).as('loginRequest');
      
      // Submit the form
      cy.get('button[type="submit"]').click();
      
      // Wait for login to complete
      cy.wait('@loginRequest');
      
      // Should redirect to homepage
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      
      // Navigate to jobs page
      cy.visit('/jobs');
    });

    it('should enable bookmark buttons for authenticated users', () => {
      // Check that bookmark buttons are enabled
      cy.get('[data-testid="bookmark-button"]').should('not.be.disabled');
      
      // Check that "Sign in to bookmark" text is not visible
      cy.contains('Sign in to bookmark').should('not.exist');
    });

    it('should successfully bookmark a job', () => {
      // Mock the bookmark API call
      cy.intercept('POST', 'https://akil-backend.onrender.com/bookmarks/*', {
        statusCode: 200,
        body: { success: true }
      }).as('createBookmark');

      // Click the first bookmark button
      cy.get('[data-testid="bookmark-button"]').first().click();
      
      // Wait for the API call
      cy.wait('@createBookmark');
      
      // Check that success toast appears
      cy.contains('Job Bookmarked').should('be.visible');
      
      // Check that the heart icon is now filled
      cy.get('[data-testid="bookmark-icon"]').first().should('have.class', 'fill-current');
    });

    it('should successfully remove a bookmark', () => {
      // First bookmark a job
      cy.intercept('POST', 'https://akil-backend.onrender.com/bookmarks/*', {
        statusCode: 200,
        body: { success: true }
      }).as('createBookmark');

      cy.get('[data-testid="bookmark-button"]').first().click();
      cy.wait('@createBookmark');

      // Mock the unbookmark API call
      cy.intercept('DELETE', 'https://akil-backend.onrender.com/bookmarks/*', {
        statusCode: 200,
        body: { success: true }
      }).as('removeBookmark');

      // Click the bookmark button again to remove
      cy.get('[data-testid="bookmark-button"]').first().click();
      
      // Wait for the API call
      cy.wait('@removeBookmark');
      
      // Check that success toast appears
      cy.contains('Bookmark Removed').should('be.visible');
      
      // Check that the heart icon is no longer filled
      cy.get('[data-testid="bookmark-icon"]').first().should('not.have.class', 'fill-current');
    });

    it('should handle bookmark API errors gracefully', () => {
      // Mock a failed bookmark API call
      cy.intercept('POST', 'https://akil-backend.onrender.com/bookmarks/*', {
        statusCode: 400,
        body: { message: 'Job not found' }
      }).as('failedBookmark');

      // Click the bookmark button
      cy.get('[data-testid="bookmark-button"]').first().click();
      
      // Wait for the API call
      cy.wait('@failedBookmark');
      
      // Check that error toast appears
      cy.contains('Job not found').should('be.visible');
    });

    it('should show bookmarked jobs in the bookmarks page', () => {
      // Mock the get bookmarks API call
      cy.intercept('GET', 'https://akil-backend.onrender.com/bookmarks', {
        statusCode: 200,
        body: { data: ['1', '2'] }
      }).as('getBookmarks');

      // Navigate to bookmarks page
      cy.visit('/bookmarks');
      
      // Wait for the API call
      cy.wait('@getBookmarks');
      
      // Check that bookmarked jobs are displayed
      cy.get('[data-testid="job-card"]').should('have.length.at.least', 1);
      
      // All displayed jobs should have filled bookmark icons
      cy.get('[data-testid="bookmark-icon"]').each(($icon) => {
        cy.wrap($icon).should('have.class', 'fill-current');
      });
    });

    it('should show empty state when no bookmarks exist', () => {
      // Mock empty bookmarks response
      cy.intercept('GET', 'https://akil-backend.onrender.com/bookmarks', {
        statusCode: 200,
        body: { data: [] }
      }).as('getEmptyBookmarks');

      // Navigate to bookmarks page
      cy.visit('/bookmarks');
      
      // Wait for the API call
      cy.wait('@getEmptyBookmarks');
      
      // Check that empty state is displayed
      cy.get('[data-testid="no-bookmarks"]').should('be.visible');
      cy.contains("You haven't bookmarked any jobs yet").should('be.visible');
      
      // Check that "Browse Jobs" button is present
      cy.contains('Browse Jobs').should('be.visible');
    });

    it('should allow searching jobs and bookmarking search results', () => {
      // Search for a specific job
      cy.get('input[placeholder*="Search jobs"]').type('Web developer');
      
      // Check that search results are filtered
      cy.get('[data-testid="job-title"]').should('contain', 'Web developer');
      
      // Mock bookmark API call
      cy.intercept('POST', 'https://akil-backend.onrender.com/bookmarks/*', {
        statusCode: 200,
        body: { success: true }
      }).as('bookmarkSearchResult');
      
      // Bookmark the search result
      cy.get('[data-testid="bookmark-button"]').first().click();
      cy.wait('@bookmarkSearchResult');
      
      // Check success message
      cy.contains('Job Bookmarked').should('be.visible');
    });

    it('should show no results message when search yields no matches', () => {
      // Search for non-existent job
      cy.get('input[placeholder*="Search jobs"]').type('NonexistentJob123');
      
      // Check that no results message is displayed
      cy.get('[data-testid="no-jobs-found"]').should('be.visible');
      cy.contains('No jobs found matching "NonexistentJob123"').should('be.visible');
      
      // Check that clear search button is present
      cy.contains('Clear Search').should('be.visible');
    });
  });

  context('Job Card Rendering', () => {
    it('should render all job card elements correctly', () => {
      // Check that job cards are rendered
      cy.get('[data-testid="job-card"]').should('have.length.greaterThan', 0);
      
      // Check that each job card has required elements
      cy.get('[data-testid="job-card"]').first().within(() => {
        cy.get('[data-testid="job-title"]').should('be.visible');
        cy.get('[data-testid="job-company"]').should('be.visible');
        cy.get('[data-testid="job-description"]').should('be.visible');
        cy.get('[data-testid="job-location"]').should('be.visible');
        cy.get('[data-testid="job-deadline"]').should('be.visible');
        cy.get('[data-testid="job-category"]').should('have.length.greaterThan', 0);
        cy.get('[data-testid="job-skill"]').should('have.length.greaterThan', 0);
        cy.get('[data-testid="bookmark-button"]').should('be.visible');
      });
    });

    it('should show loading state while bookmarking', () => {
      // Mock authentication first
      cy.window().then((win) => {
        win.localStorage.setItem('accessToken', 'mock-token');
      });
      
      cy.reload();
      
      // Mock a slow bookmark API call
      cy.intercept('POST', 'https://akil-backend.onrender.com/bookmarks/*', (req) => {
        req.reply((res) => {
          res.delay(1000);
          res.send({ statusCode: 200, body: { success: true } });
        });
      }).as('slowBookmark');

      // Click bookmark button
      cy.get('[data-testid="bookmark-button"]').first().click();
      
      // Check that button is disabled during loading
      cy.get('[data-testid="bookmark-button"]').first().should('be.disabled');
      
      // Wait for API call to complete
      cy.wait('@slowBookmark');
      
      // Button should be enabled again
      cy.get('[data-testid="bookmark-button"]').first().should('not.be.disabled');
    });
  });
});
