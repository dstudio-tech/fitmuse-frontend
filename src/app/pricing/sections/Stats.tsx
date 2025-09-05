"use client";
import React from "react";
import CountUp from "react-countup";
import { StatsSectionProps } from "@/data/props";

export default function Stats({ items }: { items: StatsSectionProps }) {
  return (
    <section id="stats" className="stats section light-background">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row align-items-center">
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div className="avatars d-flex align-items-center">
              {items?.avatars?.map((avatar) => (
                <img
                  key={avatar.id}
                  src={avatar?.formats?.small?.url}
                  alt="Muse Avatar"
                  className="rounded-circle"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          <div className="col-lg-8">
            <div className="row counters">
              {items?.counters?.map((counter) => (
                <div
                  key={counter?.id}
                  className="col-md-4"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <h2>
                    <CountUp
                      start={0}
                      duration={counter?.duration}
                      end={counter?.end}
                    />
                    {counter?.name !== "Muses Featured" && "K"}+
                  </h2>
                  <p>{counter?.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
