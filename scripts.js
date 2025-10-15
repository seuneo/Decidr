// Shared JavaScript functionality for the voting app

// App State Management
class VotingApp {
    constructor() {
        this.room = null;
        this.userRole = 'participant';
        this.userVote = null;
        this.isVoting = false;
        this.init();
    }

    init() {
        // Initialize app state from localStorage if available
        this.loadState();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start any necessary background processes
        this.startBackgroundProcesses();
        
        // Initialize Lucide icons
        this.initializeLucideIcons();
    }

    // State Management
    saveState() {
        const state = {
            room: this.room,
            userRole: this.userRole,
            userVote: this.userVote
        };
        localStorage.setItem('votingAppState', JSON.stringify(state));
    }

    loadState() {
        const savedState = localStorage.getItem('votingAppState');
        if (savedState) {
            const state = JSON.parse(savedState);
            this.room = state.room;
            this.userRole = state.userRole;
            this.userVote = state.userVote;
        }
    }

    clearState() {
        this.room = null;
        this.userRole = 'participant';
        this.userVote = null;
        this.isVoting = false;
        localStorage.removeItem('votingAppState');
    }

    // Navigation
    navigateTo(page) {
        // Check if we're already in a subdirectory (pages folder)
        if (window.location.pathname.includes('/pages/')) {
            window.location.href = `${page}.html`;
        } else {
            window.location.href = `pages/${page}.html`;
        }
    }

    goHome() {
        this.clearState();
        // Check if we're in a subdirectory (pages folder)
        if (window.location.pathname.includes('/pages/')) {
            window.location.href = '../index.html';
        } else {
            window.location.href = 'index.html';
        }
    }

    // Room Management
    createRoom(question) {
        const roomId = Math.random().toString(36).substr(2, 6).toUpperCase();
        this.room = {
            id: roomId,
            question: question,
            participants: 25,
            votes: { up: 0, down: 0 },
            isActive: false,
            hasVoted: false
        };
        this.userRole = 'host';
        this.saveState();
        return this.room;
    }

    joinRoom(roomCode) {
        // Simulate finding a room
        this.room = {
            id: roomCode,
            question: "Approve the new design mockup?",
            participants: 3,
            votes: { up: 0, down: 0 },
            isActive: false,
            hasVoted: false
        };
        this.userRole = 'participant';
        this.saveState();
        return this.room;
    }

    startVoting() {
        if (this.room) {
            this.room.isActive = true;
            this.saveState();
        }
    }

    castVote(vote) {
        if (this.isVoting || !this.room || this.room.hasVoted) return false;
        
        this.isVoting = true;
        
        // Update vote count immediately
        this.userVote = vote;
        this.room.votes[vote]++;
        this.room.hasVoted = true;
        this.saveState();
        
        // Simulate vote processing
        setTimeout(() => {
            this.isVoting = false;
            
            // Auto-transition to results after 2 seconds for participants
            if (this.userRole === 'participant') {
                setTimeout(() => {
                    this.navigateTo('results');
                }, 2000);
            }
        }, 500);
        
        return true;
    }

    endPoll() {
        this.navigateTo('results');
    }

    // Utility Functions
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type === 'error' ? 'bg-danger' : 'bg-success'}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 3000);
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Copied to clipboard!');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('Copied to clipboard!');
        }
    }

    shareResults() {
        if (navigator.share) {
            navigator.share({
                title: 'VoteIt Results',
                text: `Vote Results: ${this.room.question}`,
                url: window.location.href
            });
        } else {
            this.copyToClipboard(window.location.href);
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Handle form submissions
        document.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.goHome();
            }
        });
    }

    // Background Processes
    startBackgroundProcesses() {
        // Auto-simulate other participants voting for demo purposes
        if (this.room && this.userRole === 'host') {
            setInterval(() => {
                if (this.room) {
                    const totalVotes = this.room.votes.up + this.room.votes.down;
                    // Stop simulation when we reach 25 votes
                    if (totalVotes < 25) {
                        const randomVote = Math.random() > 0.6 ? 'up' : 'down';
                        this.room.votes[randomVote]++;
                        this.saveState();
                        
                        // Update UI if on voting page
                        if (window.location.pathname.includes('voting.html')) {
                            this.updateVotingUI();
                            // Also call the page's updateVotingUI function if it exists
                            if (typeof updateVotingUI === 'function') {
                                updateVotingUI();
                            }
                        }
                    }
                }
            }, 3000);
        }
    }

    initializeLucideIcons() {
        // Initialize Lucide icons when the app starts
        initializeLucideIcons();
    }

    // UI Updates
    updateVotingUI() {
        if (!this.room) return;

        const votesCount = document.getElementById('votes-count');
        if (votesCount) {
            const totalVotes = this.room.votes.up + this.room.votes.down;
            votesCount.textContent = `${totalVotes} voted`;
        }

        const endPollBtn = document.getElementById('end-poll-btn');
        if (endPollBtn) {
            const totalVotes = this.room.votes.up + this.room.votes.down;
            endPollBtn.disabled = totalVotes === 0;
        }
    }

    // Results Calculations
    getResults() {
        if (!this.room) return null;

        const totalVotes = this.room.votes.up + this.room.votes.down;
        const yesPercentage = totalVotes > 0 ? Math.round((this.room.votes.up / totalVotes) * 100) : 0;
        const noPercentage = totalVotes > 0 ? Math.round((this.room.votes.down / totalVotes) * 100) : 0;

        const winner = this.room.votes.up > this.room.votes.down ? 'YES' : 
                      this.room.votes.down > this.room.votes.up ? 'NO' : 'TIE';

        return {
            totalVotes,
            yesPercentage,
            noPercentage,
            winner,
            upVotes: this.room.votes.up,
            downVotes: this.room.votes.down
        };
    }
}

// Initialize the app
const app = new VotingApp();

// Global functions for HTML onclick handlers
function showToast(message, type = 'success') {
    app.showToast(message, type);
}

function copyToClipboard(text) {
    app.copyToClipboard(text);
}

function goHome() {
    app.goHome();
}

function navigateTo(page) {
    app.navigateTo(page);
}

// Form validation helpers
function validateQuestion(question) {
    return question && question.trim().length > 0;
}

function validateRoomCode(roomCode) {
    return roomCode && roomCode.trim().length >= 4;
}

// Input formatting helpers
function formatRoomCode(input) {
    const value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    input.value = value;
    return value;
}

// Animation helpers
function animateProgressBar(element, percentage) {
    element.style.width = '0%';
    setTimeout(() => {
        element.style.width = `${percentage}%`;
    }, 100);
}

function animateScaleIn(element) {
    element.style.transform = 'scale(0)';
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }, 100);
}

// Lucide Icons initialization
function initializeLucideIcons() {
    // Check if Lucide is available
    if (typeof lucide !== 'undefined') {
        // Initialize all Lucide icons on the page
        lucide.createIcons();
        
        // Re-initialize icons when new content is added dynamically
        const observer = new MutationObserver((mutations) => {
            let shouldReinitialize = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if any added nodes contain Lucide icons
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.querySelector && node.querySelector('[data-lucide]')) {
                                shouldReinitialize = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldReinitialize) {
                lucide.createIcons();
            }
        });
        
        // Start observing the document for changes
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// QR Code generation
function generateQRCode(data, size = 300) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
}

// Room link generation
function generateRoomLink(roomId) {
    return `${window.location.origin}/pages/voting.html?room=${roomId}`;
}

// URL parameter helpers
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function setUrlParameter(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, '', url);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VotingApp, app };
}