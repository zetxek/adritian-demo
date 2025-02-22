+++
title =  "Home"
type = "home"
draft = false
+++


{{< showcase-section
    title="Showcase section"
    subtitle="Subtitle - coming from <code>home.md</code>"
    buttonText="Email"
    description="<strong>Strong</strong> and normal text. This comes from <code>home.md</code>. Not provided? fallback to i18n"
    image="images/showcase/showcase.png"
    image2x="images/showcase/showcase@2x.png"
 >}}


{{< about-section
    title="About me"
    content="Using HTML <code><></code> delimiters</code>"
    about_button="Button text"
    button_icon="info"
    button_text="You can edit this"
    button_url="https://www.google.com"
    image="images/about/user-picture.png"
    image2x="images/about/user-picture@2x.png"

 >}}

{{% about-section
    title="About me"
    about_button="Button text" %}}
This is the inner content. 
{{ /about-section %}}

{{< education-list
    title="Formal Education" >}}

{{< experience-section
    title="My job experience (section)"
    intro_title="Intro (intro_title)"
    intro_description="Description (intro_description).<br>You can use HTML,with <strong>strong</strong> formatting, or lists <ul><li>one</li><li>two</li></ul>" 
    button1_url="https://example.com"
    button1_text="Visit Example"
    button1_icon="icon-globe"
    button2_text="Another Button (2)"
    button3_text="Button #3"
>}}
## Experience (list)

{{< experience-list >}}
 

{{< client-and-work-section
    title="A selection of my work" >}} 

{{< testimonial-section
    title="What they say about me" >}}

{{< contact-section
    title="Reach out" 
    contact_form_name="Your name?"
    contact_form_email="Your e-mail"
    contact_form_message="Your text"
    contact_button="Send message"
    contact_phone_title="My phone"
    contact_phone_number="<a href='tel:+555 666 777'>"
    contact_email_title="My mail"
    contact_email_email="demo@demosite.com"
    contact_address_title="My location"
    contact_address_address="🇩🇰 Denmark" >}}

{{< newsletter-section 
    newsletter_title="Stay updated"
    newsletter_placeholder="Enter your email"
    newsletter_button="Subscribe"
    newsletter_success_message="Thank you for subscribing!"
    newsletter_error_message="Something went wrong, please try again."
    newsletter_note="We respect your privacy and won't share your data."
>}}

Additional content added after the `section` blocks:

```
sections = [
  "showcase",
  "about",
  "education",
  "experience",
  "client-and-work",
  "testimonial",
  "contact",
  "newsletter",
]
```