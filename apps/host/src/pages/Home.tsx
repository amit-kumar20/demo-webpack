import React from "react";
import { motion } from "framer-motion";
import "./Home.css";
import { useNavigate } from "react-router-dom";


type HomeCard = {
  title: string;
  description: string;
  route: string;
  image: string;
};

const homeCards: HomeCard[] = [
  {
    title: "Submit Ticket",
    description: "Raise a new support issue",
    route: "/ticket",
    image: "/assets/ticket.png",
  },
  {
    title: "My Tickets",
    description: "View and manage your submitted tickets",
    route: "/ticket/mine",
    image: "/assets/mytickets.png",
  },
  {
    title: "Analytics",
    description: "View ticket trends and metrics",
    route: "/dashboard",
    image: "/assets/analytics.png",
  },
  {
    title: "Help Center",
    description: "Find answers in our knowledge base",
    route: "/help",
    image: "/assets/help.png",
  },
  {
    title: "Notifications",
    description: "Stay updated with recent changes",
    route: "/notification",
    image: "/assets/notification.png",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="home-title">Welcome to Support Portal</h1>

      <motion.div
        className="home-cards"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {homeCards.map((card) => (
          <motion.div
            key={card.title}
            className="home-card"
            onClick={() => navigate(card.route)}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={card.image}
              alt={card.title}
              onError={(e) =>
                (e.currentTarget.src = "/assets/fallback.png")
              }
            />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
