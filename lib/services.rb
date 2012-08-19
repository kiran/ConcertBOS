module Services

  # If we can't find a resource for a particular congressman, then:
  class NotFoundException < RuntimeError; end

end