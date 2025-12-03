"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import {
  Music,
  Image as ImageIcon,
  Instagram,
  Music2,
  Users,
  BarChart3,
  LogOut,
  Palette,
  Upload,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";

// ✅ SUCCESS POPUP (UPLOAD/SUBMIT)
function SuccessAlert({ onClose, theme }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
          borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb",
        }}
        className="rounded-2xl p-6 w-[350px] border shadow-2xl"
      >
        <h2
          style={{ color: theme === "dark" ? "#4ade80" : "#16a34a" }}
          className="text-center text-xl font-semibold mb-2"
        >
          Upload
        </h2>
        <p
          style={{ color: theme === "dark" ? "#d1d5db" : "#374151" }}
          className="text-sm text-center"
        >
          File upload completed successfully! Go to Submissions to view uploaded
          content.
        </p>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#333] text-white text-sm"
          >
            Back to submit
          </button>

          <Link
            href="/submissions"
            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm"
          >
            Submissions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { theme } = useThemeStore();
  const [musicCount, setMusicCount] = useState(0);
  const [artCount, setArtCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [userUploads, setUserUploads] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [showFullPrivacy, setShowFullPrivacy] = useState(false);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      return data.user;
    };

    const loadCounts = async (currentUser: any) => {
      // Total songs count
      const { count: songCount } = await supabase
        .from("songs")
        .select("*", { count: "exact", head: true });

      // Total art count
      const { count: artCount } = await supabase
        .from("art")
        .select("*", { count: "exact", head: true });

      // Active users count (count unique users who have uploaded)
      const { data: songUsers } = await supabase
        .from("songs")
        .select("user_id");

      const { data: artUsers } = await supabase.from("art").select("user_id");

      const uniqueUserIds = new Set([
        ...(songUsers?.map((s) => s.user_id) || []),
        ...(artUsers?.map((a) => a.user_id) || []),
      ]);
      const totalUsers = uniqueUserIds.size;

      // User-specific uploads
      let userSongCount = 0;
      let userArtCount = 0;

      if (currentUser) {
        const { count: userSongs } = await supabase
          .from("songs")
          .select("*", { count: "exact", head: true })
          .eq("user_id", currentUser.id);

        const { count: userArts } = await supabase
          .from("art")
          .select("*", { count: "exact", head: true })
          .eq("user_id", currentUser.id);

        userSongCount = userSongs || 0;
        userArtCount = userArts || 0;
      }

      setMusicCount(songCount || 0);
      setArtCount(artCount || 0);
      setActiveUsers(totalUsers);
      setUserUploads(userSongCount + userArtCount);
    };

    loadUser().then((currentUser) => {
      loadCounts(currentUser);
    });
  }, []);

  return (
    <div
      style={{ color: theme === "dark" ? "#fff" : "#1f2937" }}
      className="space-y-10"
    >
      {/* ⭐ STATS SECTION */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Images */}
        <div
          style={{
            backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
            borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb",
          }}
          className="p-6 rounded-2xl border"
        >
          <Palette className="text-pink-400 mb-3" size={28} />
          <p
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
            className="text-sm"
          >
            Total image
          </p>
          <h2 className="text-2xl font-bold mt-1">{artCount}</h2>
        </div>

        {/* Total Music */}
        <div
          style={{
            backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
            borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb",
          }}
          className="p-6 rounded-2xl border"
        >
          <Music2 className="text-red-400 mb-3" size={28} />
          <p
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
            className="text-sm"
          >
            Total music
          </p>
          <h2 className="text-2xl font-bold mt-1">{musicCount}</h2>
        </div>

        {/* Active Users (Dummy or real later) */}
        <div
          style={{
            backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
            borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb",
          }}
          className="p-6 rounded-2xl border"
        >
          <Users className="text-green-400 mb-3" size={28} />
          <p
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
            className="text-sm"
          >
            Active users
          </p>
          <h2 className="text-2xl font-bold mt-1">{activeUsers}</h2>
        </div>

        {/* Upload Count */}
        <div
          style={{
            backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
            borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb",
          }}
          className="p-6 rounded-2xl border"
        >
          <Upload className="text-yellow-400 mb-3" size={28} />
          <p
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
            className="text-sm"
          >
            Your upload
          </p>
          <h2 className="text-2xl font-bold mt-1">{userUploads}</h2>
        </div>
      </div>

      {/* ⭐ ABOUT SECTION */}
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
          borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb",
        }}
        className="border p-8 rounded-2xl space-y-6"
      >
        <h2 className="text-xl font-semibold">About our website</h2>
        <p
          style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
          className="leading-relaxed"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing
        </p>

        {/* SOCIALS */}
        <div className="flex items-center gap-6 pt-2">
          <Instagram
            size={26}
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
          />
          <Music2
            size={26}
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
          />
          <BarChart3
            size={26}
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
          />
        </div>
      </div>

      {/*  TERMS & CONDITIONS */}
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
          borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb",
        }}
        className="border p-8 rounded-2xl space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white">
          Terms and conditions of website
        </h2>

        <p
          style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
          className="leading-relaxed"
        >
          PLEASE READ THIS AGREEMENT CAREFULLY. THIS AGREEMENT CONTAINS A
          MANDATORY INDIVIDUAL ARBITRATION AND JURY TRIAL WAIVER PROVISION THAT
          REQUIRES THE USE OF ARBITRATION, RATHER THAN JURY TRIALS, IN
          ACCORDANCE WITH THE BC INTERNATIONAL COMMERCIAL ARBITRATION ACT.
        </p>

        {showFullPrivacy && (
          <div
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
            className="space-y-6 leading-relaxed text-[15px]"
          >
            <p>
              By registering to this service or continuing to use The Website,
              you are agreeing to a legally binding contract between you and
              Company, and affirm that you are at least of the legal age of
              majority in your territory, are fully able and competent to enter
              into all elements set forth in these Terms of Service, and to
              abide by and comply with these Terms of Service. If you are not
              the legal age of majority in your territory, then please cease any
              use of our Service or The Website and exit this website
              immediately.
            </p>

            <h3 className="font-semibold text-white text-[18px]">
              1. Description of Services
            </h3>

            <p>
              The District is a platform that facilitates the sharing of music
              and art from rights holders to music curation brands and labels.
              We aim to simplify the process between parties as much as possible
              by providing tools and streamlining the rights and asset flow
              through this service, however, we absolutely cannot be held
              responsible for the individual actions of any parties using this
              service and each user is responsible for their actions when using
              this platform and performing their own due diligence.
            </p>

            <p>
              It is important to note that curation brands retain all the rights
              to their music and artwork selections. Submitting content through
              this platform does not guarantee placement, acceptance, or
              feedback through any brand outlets. At our sole discretion, we may
              maintain different types of Accounts for different types of Users.
              If you register an Account on behalf of your company, then “you”
              includes you and your company collectively and you represent and
              warrant that you are an authorized representative of your company
              with the full authority to bind your company to these Terms of
              Service. By connecting to us with a third-party service (including
              Facebook), you give us permission to access and use your
              information as permitted by that service, and to store your
              authentication credentials. The Service is not available to any
              User who has been removed by us.
            </p>

            <h3 className="font-semibold text-white text-[18px]">
              2. Definitions
            </h3>

            <p>
              “Account” means a User specific login registered on the Service
              that may contain information or Content related to that User.
              “Content” means any audio or visual works submitted by a User to
              the Service. “Marks” means proprietary names, logos, or
              trademarks. “Service” means the platform provided by the Company
              for the distribution of artwork and music to curation brands.
              “User” means any registered individual, company, curator, brand,
              or entity.
            </p>

            <h3 className="font-semibold text-white text-[18px]">
              3. Registration
            </h3>

            <p>
              By registering and participating in this Service, you agree and
              represent as follows:
            </p>

            <p className="font-semibold">
              1. You are of the legal age of majority;
              <br />
              2. All information you submit is accurate and updated;
              <br />
              3. You agree to be contacted via Email by us regarding our
              services;
            </p>

            <p>
              <span className="font-semibold">4.</span> You hereby grant us
              permission to Email or display your profile and other information
              as may be supplied by you to us or on our website, as we deem
              advisable for your Service connection.
            </p>

            <p>
              <span className="font-semibold">5.</span> By using the Service,
              you grant us permission to access your Account and messages,
              information, text, graphics, audio, video, or other material
              uploaded or transmitted solely for the provision of the Service.
            </p>

            <h3 className="font-semibold text-white text-[18px]">
              4. Responsibility for User Content
            </h3>

            <p className="font-semibold">
              You shall be solely responsible for your own Content on the
              Service and the consequences of using the Service to distribute
              such Content.
            </p>

            <p>
              1. You own or have all rights to distribute the Content;
              <br />
              2. You authorize us to use your intellectual property for the
              Service;
              <br />
              3. Your Content does not infringe any rights;
              <br />
              4. Your Content does not advocate harm;
              <br />
              5. Your Content is not harmful to minors;
              <br />
              6. Your Content is not illegal, abusive, or misleading;
              <br />
              7. You assume full liability and indemnify us from all claims.
            </p>

            <h3 className="font-semibold text-white text-[18px]">
              5. Your Conduct & Prohibited Uses
            </h3>

            <p>
              You agree not to use the Service for unlawful purposes. You must
              comply with all local laws, intellectual property rules, internet
              rules, data protection, and privacy regulations.
            </p>

            <h3 className="font-semibold text-white text-[18px]">
              6. Intellectual Property Ownership
            </h3>

            <p>
              All copyrights, trademarks, database rights, design rights, and
              all intellectual property relating to the Service or Company are
              the sole property of the Company. No rights are granted to you
              unless explicitly written. No rights to any uploaded Content are
              granted to us except those stated within these Terms.
            </p>
          </div>
        )}

        <button
          onClick={() => setShowFullPrivacy(!showFullPrivacy)}
          className="text-blue-400 underline text-sm hover:text-blue-300 flex items-center gap-1"
        >
          {showFullPrivacy
            ? "Show less"
            : "Click to see the full privacy and policy"}
          <ChevronDown
            size={16}
            className={`transition-transform ${
              showFullPrivacy ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* PRIVACY */}
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
          borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb",
        }}
        className="border p-8 rounded-2xl space-y-4"
      >
        <h2 className="text-xl font-semibold">Privacy and policy of website</h2>
        <p
          style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
          className="leading-relaxed"
        >
          This privacy policy has been compiled to better serve those who are
          concerned with how their 'Personally Identifiable Information' (PII)
          is being used through our website and services. PII, as described in
          US privacy law and information security, is information that can be
          used on its own or with other information to identify, contact, or
          locate a single person, or to identify an individual in context.
          Please read our privacy policy carefully to get a clear understanding
          of how we collect, use, protect or otherwise handle your Personally
          Identifiable Information in accordance with our website. What personal
          information do we collect from the people that visit our website or
          app? When registering on our site, utilizing our services, or placing
          an order through one of ours or our affiliate client stores, as and
          when appropriate, you may be asked to enter identifiable information
          including without limitation your name, email address, mailing
          address, phone number, credit card information or other details to
          help you with your experience.
          {showFullTerms && (
            <>
              <p>
                When do we collect information? We collect information from you
                when you register on our site, place an order, subscribe to a
                newsletter, respond to a survey, fill out a form, open a support
                ticket or enter information anywhere on our site. How do we use
                your information? We may use the information we collect from you
                when you register, make a purchase, sign up for our newsletter,
                respond to a survey or marketing communication, surf the
                website, or use certain other site features in the following
                ways: • To personalize your experience and to allow us to
                deliver the type of content and product offerings in which you
                are most interested;
              </p>
              <br />
              <p>
                • To improve our website in order to better serve you; • To
                allow us to better service you in responding to your customer
                service requests; • To administer a contest, promotion, survey
                or other site feature; • To quickly process your transactions; •
                To ask for ratings and reviews of services or products; or • To
                follow up with them after correspondence (live chat, email or
                phone inquiries). How do we protect your information? Our
                website is scanned on a regular basis for security holes and
                known vulnerabilities in order to make your visit to our site as
                safe as possible. We use regular Malware Scanning. Your personal
                information is contained behind secured networks and is only
                accessible by a limited number of persons who have special
                access rights to such systems, and are required to keep the
                information confidential. In addition, all sensitive/credit
                information you supply is encrypted via Secure Socket Layer
                (SSL) technology.
              </p>
              <br />
              <p>
                We implement a variety of security measures enters, submits, or
                accesses their information or when a user places an order to
                maintain the safety of your personal information. All
                transactions are processed through a gateway provider and are
                not stored or processed on our servers. Do we use 'cookies'?
                Yes. Cookies are small files that a site or its service provider
                transfers to your computer's hard drive through your Web browser
                (if you allow) that enables the site's or service provider's
                systems to recognize your browser and capture and remember
                certain information. For instance, we use cookies to help us
                remember and process the items in your shopping cart. They are
                also used to help us understand your preferences based on
                previous or current site activity, which enables us to provide
                you with improved services.
              </p>
              <br />
              <p>
                We also use cookies to help us compile aggregate data about site
                traffic and site interaction so that we can offer better site
                experiences and tools in the future. We use cookies to: Help
                remember and process the items in the shopping cart; Understand
                and save user's preferences for future visits; or Compile
                aggregate data about site traffic and site interactions in order
                to offer better site experiences and tools in the future. We may
                also use trusted third-party services that track this
                information on our behalf. You can choose to have your computer
                warn you each time a cookie is being sent, or you can choose to
                turn off all cookies. You do this through your browser settings.
                Since every browser is a little different, look at your
                browser's Help Menu to learn the correct way to modify your
                cookies. If users disable cookies in their browser: If you
                choose to disable cookies on the site, it may turn off or
                disable some features or functionality. Third-party disclosure
                We do not sell, trade, or otherwise transfer to outside parties
                your Personally Identifiable Information unless we provide users
                with advance notice. This does not include website hosting
                partners and other parties who assist us in operating our
                website, conducting our business, or serving our users, so long
                as those parties agree to keep this information confidential.
              </p>
              <br />
              <p>
                We may also release information when it's release is appropriate
                to comply with the law, enforce our site policies, or protect
                ours or others' rights, property or safety. However,
                non-personally identifiable visitor information may be provided
                to other parties for marketing, advertising, or other uses.
                Third-party links Occasionally, at our discretion, we may
                include or offer third-party products or services on our
                website. These third-party sites have separate and independent
                privacy policies. We therefore claim no responsibility or
                liability for the content and activities of these linked sites
                or services. Nonetheless, we seek to protect the integrity of
                our site and welcome any feedback about these sites. Google
                Google's advertising requirements can be summed up by Google's
                Advertising Principles. They are put in place to provide a
                positive experience for users.
              </p>
              <br />
              <p>
                We have not currently enabled Google AdSense on our site but we
                may choose to do so in the future. California Online Privacy
                Protection Act CalOPPA is the first state law in the nation to
                require commercial websites and online services to post a
                privacy policy. The law's reach stretches well beyond California
                to require any person or company in the United States (and
                conceivably the world) that operates websites collecting
                Personally Identifiable Information from California consumers to
                post a conspicuous privacy policy on its website stating exactly
                the information being collected and those individuals or
                companies with whom it is being shared. - See more at:
                http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf
                According to CalOPPA, we agree to the following: Users can visit
                our site anonymously; Once this privacy policy is created, we
                will add a link to it on our home page or as a minimum, on the
                first significant page after entering our website; Our Privacy
                Policy link includes the word 'Privacy' and can easily be found
                on the page specified above. You will be notified of any Privacy
                Policy changes on our Privacy Policy Page. You can change any of
                your personal information by logging in to your account. How
                does our site handle Do Not Track signals? We honor Do Not Track
                signals and Do Not Track, plant cookies, or use advertising when
                a Do Not Track (DNT) browser mechanism is in place. Does our
                site allow third-party behavioral tracking? It's also important
                to note that we do not allow third-party behavioral tracking.
                COPPA (Children Online Privacy Protection Act) When it comes to
                the collection of personal information from children under the
                age of 13 years old, the Children's Online Privacy Protection
                Act (COPPA) puts parents in control.
              </p>
              <br />
              <p>
                The Federal Trade Commission, United States' consumer protection
                agency, enforces the COPPA Rule, which spells out what operators
                of websites and online services must do to protect children's
                privacy and safety online. We do not specifically market to
                children under the age of 13 years old. Fair Information
                Practices The Fair Information Practices Principles form the
                backbone of privacy law in the United States and the concepts
                they include have played a significant role in the development
                of data protection laws around the globe. Understanding the Fair
                Information Practice Principles and how they should be
                implemented is critical to comply with the various privacy laws
                that protect personal information. In order to be in line with
                Fair Information Practices we will take the following responsive
                action, should a data breach occur: We will notify you via email
                within 7 business days; We will notify the users via in-site
                notification within 7 business days. We also agree to the
                Individual Redress Principle which requires that individuals
                have the right to legally pursue enforceable rights against data
                collectors and processors who fail to adhere to the law.
              </p>
              <br />
              <p>
                This principle requires not only that individuals have
                enforceable rights against data users, but also that individuals
                have recourse to courts or government agencies to investigate
                and/or prosecute non-compliance by data processors. CAN SPAM Act
                The CAN-SPAM Act is a law that sets the rules for commercial
                email, establishes requirements for commercial messages, gives
                recipients the right to have emails stopped from being sent to
                them, and spells out tough penalties for violations. We collect
                your email address in order to: Send information, respond to
                inquiries, and/or other requests or questions; Process orders
                and to send information and updates pertaining to orders; Send
                you additional information related to your product and/or
                service; and Market to our mailing list or continue to send
                emails to our clients after the original transaction has
                occurred. To be in accordance with CANSPAM, we agree to the
                following: Not use false or misleading subjects or email
                addresses; Identify the message as an advertisement in some
                reasonable way; Include the physical address of our business or
                site headquarters; Monitor third-party email marketing services
                for compliance, if one is used; Honor opt-out/unsubscribe
                requests quickly; and Allow users to unsubscribe by using the
                link at the bottom of each email. If at any time you would like
                to unsubscribe from receiving future emails, you can follow the
                instructions at the bottom of each email and we will promptly
                remove you from ALL correspondence.
              </p>
              <br />
            </>
          )}
        </p>
        <button
          onClick={() => setShowFullTerms(!showFullTerms)}
          className="text-blue-400 underline text-sm hover:text-blue-300 flex items-center gap-1"
        >
          {showFullTerms
            ? "Show less"
            : "Click to see the full terms and conditions"}
          <ChevronDown
            size={16}
            className={`transition-transform ${
              showFullTerms ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {showSuccess && (
        <SuccessAlert onClose={() => setShowSuccess(false)} theme={theme} />
      )}
    </div>
  );
}
