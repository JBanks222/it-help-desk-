// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQT57cE1_toKSBg0R1tXK-0nKAgKUpgUA",
    authDomain: "virtual-it-help-desk.firebaseapp.com",
    projectId: "virtual-it-help-desk",
    storageBucket: "virtual-it-help-desk.appspot.com",
    messagingSenderId: "101344013014",
    appId: "1:101344013014:web:b7201e6dd81b23edbbb777",
    measurementId: "G-2BKGPYQDV6"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const analytics = firebase.analytics();
  const db = firebase.firestore();
  
  // Function to load topics and related guides
  async function loadPopularTopics() {
      try {
          const topicsCollection = db.collection("topics");
          const topicsSnapshot = await topicsCollection.get();
  
          // Get the container element for popular topics
          const topicsGrid = document.querySelector(".topics-grid");
  
          topicsSnapshot.forEach((topicDoc) => {
              const topicData = topicDoc.data();
  
              // Create a div to show the topic name
              const topicDiv = document.createElement("div");
              topicDiv.classList.add("topic-card");
              topicDiv.textContent = topicData.name;
              topicsGrid.appendChild(topicDiv);
  
              // If there are related guides, fetch them
              if (topicData.relatedGuides && Array.isArray(topicData.relatedGuides)) {
                  topicData.relatedGuides.forEach(async (guideRef) => {
                      const guideDoc = await guideRef.get();
                      if (guideDoc.exists) {
                          const guideData = guideDoc.data();
  
                          // Get the container element for guides
                          const guidesList = document.querySelector(".guides-list");
                          const guideArticle = document.createElement("article");
                          guideArticle.innerHTML = `<h3>${guideData.title}</h3><p>${guideData.content}</p>`;
                          guidesList.appendChild(guideArticle);
                      }
                  });
              }
          });
      } catch (error) {
          console.error("Error loading topics:", error);
      }
  }
  
  // Load topics on page load
  window.onload = () => {
      loadPopularTopics();
  };
  