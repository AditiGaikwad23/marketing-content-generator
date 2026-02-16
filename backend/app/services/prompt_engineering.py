def build_prompt(topic, platform, tone, brand_context):

    return f"""
You are a professional marketing copywriter.

Create high-converting {platform} ad copy.

Topic: {topic}
Tone: {tone}

Brand Context:
{brand_context}

Output format:
Headline:
Primary Text:
Call To Action:
"""
