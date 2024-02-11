import React from "react";

function AboutUsIntro() {
  return (
    <div className="w-full bg-white">
      {/* wave background */}
      <div className="waveBg">
        <section className="min-h-[93vh] w-full flex flex-col md:flex-row justify-center items-center p-1">
          <div className=" p-8 md:p-[10vh] ">
            <img
              className=" rounded-lg md:rounded-3xl md:w-[28vw] object-cover "
              src="https://images.unsplash.com/photo-1531969179221-3946e6b5a5e7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="text-xl md:text-4xl text-gray-900 font-bold w-full md:w-1/2 md:pl-40 p-5">
            Our story began with a shared love for tea and a vision to create a
            sanctuary for tea enthusiasts of all backgrounds. Founded by a team
            of dedicated tea aficionados, Tea Harmony is more than just a
            marketplace; it's a celebration of culture, community, and
            connection.
          </div>
        </section>
        <img
          className="wave-gradient w-full mt-[-1px]"
          src="/assets/wave.png"
          alt=""
        />
      </div>
      {/* bubbles */}
      <div className="min-h-[50vh] w-full relative flex justify-center items-center flex-wrap md:px-12 gap-12 bg-[#eff0f4]">
        <div className=" relative w-[350px] h-[350px]  drop">
          <div className="flex justify-center items-center h-full w-full text-2xl px-5 text-center font-bold text-gray-500">
            Extensive collection of over 100 Varieties of Tea
          </div>
        </div>
        <div className=" relative w-[350px] h-[350px] drop">
          <div className="flex justify-center items-center h-full w-full text-2xl px-5 text-center font-bold text-gray-500">
            3 Levels of Tea Quality Assurance
          </div>
        </div>
        <div className=" relative w-[350px] h-[350px] drop">
          <div className="flex justify-center items-center h-full w-full text-2xl px-5 text-center font-bold text-gray-500">
            Eco-friendly, Zero-Waste Packaging
          </div>
        </div>
      </div>
      {/* ink drop */}
      <div className="bg-[#eff0f4]">
        <div className="flex flex-col md:flex-row w-full h-full  min-h-[70vh]  rounded-t-[50px] md:rounded-t-[100px] p-5 md:justify-center md:items-center  bg-white">
          <div className=" w-full md:w-1/2 h-full text-lg md:text-3xl text-gray-600 font-bold p-2 md:p-20 mb-10">
            We believe that tea is not merely a beverage but a reflection of
            time-honored rituals, craftsmanship, and the beauty of nature. From
            the tranquil hillsides of Japan to the misty mountains of China,
            each tea leaf carries with it a story waiting to be savored.
          </div>
          <div className="relative h-full w-full md:w-1/2 flex md:justify-center md:items-center">
            <video
              className="absolute w-full object-cover md:p-8"
              src="/assets/videos/sipTea.mp4"
              type="video/mp4"
              autoPlay
              muted
              loop
            ></video>
            <video
              className="absolute w-full object-cover mix-blend-screen scale-[1.003] brightness-200 md:p-8"
              src="/assets/videos/InkDrop.mp4"
              type="video/mp4"
              autoPlay
              muted
              loop
            ></video>
          </div>
        </div>
      </div>

      {/* scrach pad */}
      <div className="flex flex-col md:flex-row w-full h-full  min-h-[60vh]  rounded-[50px] md:rounded-[100px] rounded-b-[100px] py-20 p-5 md:justify-center md:items-center bg-[#eff0f4] ">
        <div className=" w-full  h-full text-lg md:text-3xl text-gray-600 font-bold p-2 md:px-[20vw] md:p-20">
          <p>
            With a deep-rooted commitment to sustainability and ethical
            sourcing, we partner directly with tea artisans and growers who
            share our values, ensuring that every cup of tea supports both the
            planet and the people who nurture it.
          </p>
          <br />
          <p>
            Thank you for choosing Tea Harmony. Here's to a life steeped in
            harmony.
          </p>
          <br />
          <p>Warm regards,</p>
          <p>The Tea Harmony Team</p>{" "}
        </div>
      </div>
    </div>
  );
}

export default AboutUsIntro;
